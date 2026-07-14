require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const mysql = require('mysql2/promise');
const bcrypt = require('bcrypt');
const { GoogleGenerativeAI } = require("@google/generative-ai");
const { OAuth2Client } = require('google-auth-library');

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const SALT_ROUNDS = 12; // bcrypt cost factor — higher = slower = more secure

const app = express();

// ─── SECURITY HEADERS (Helmet) ────────────────────────────────────────────────
// Sets best-practice HTTP security headers automatically
app.use(helmet({
  contentSecurityPolicy: false, // Disabled to avoid blocking inline scripts in HTML pages
}));

// ─── CORS CONFIGURATION ───────────────────────────────────────────────────────
// Allow localhost in development and your production domain in deployment
const allowedOrigins = [
  'http://localhost:3000',
  'http://127.0.0.1:3000',
  'https://web-based-car-service-advisor.herokuapp.com', // Production Heroku URL
  process.env.FRONTEND_URL, // Override via env var if needed
].filter(Boolean); // Remove undefined entries

// Also allow any *.herokuapp.com origin dynamically (for Heroku review apps / staging)

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (e.g. Postman, server-to-server, Heroku health checks)
    if (!origin) return callback(null, true);
    // Allow *.herokuapp.com automatically (covers the deployed app itself)
    if (origin.endsWith('.herokuapp.com')) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error('CORS policy: Origin not allowed'));
  },
  credentials: true,
}));

app.use(express.json());
// Serve static files (HTML, CSS, JS, images) from the project root
app.use(express.static(__dirname));

// ─── RATE LIMITING ───────────────────────────────────────────────────────
// General limiter: max 100 requests per 15 minutes per IP
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many requests, please try again later.' },
});

// Strict limiter for auth routes: max 10 login/register attempts per 15 minutes
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many login attempts, please try again in 15 minutes.' },
});

// Apply general limiter to all /api/ routes
app.use('/api/', apiLimiter);
// Apply strict limiter specifically to auth endpoints
app.use('/api/users/login', authLimiter);
app.use('/api/users/register', authLimiter);

// ─── DATABASE CONNECTION ──────────────────────────────────────────────────────
// Supports local .env, Heroku JawsDB (JAWSDB_URL), and generic DATABASE_URL
let pool;
const cloudDbUrl = process.env.JAWSDB_URL || process.env.DATABASE_URL;

if (cloudDbUrl) {
  // Heroku JawsDB / ClearDB / generic MySQL connection URL
  // Format: mysql://user:password@host:port/database
  const dbUrl = new URL(cloudDbUrl);
  pool = mysql.createPool({
    host: dbUrl.hostname,
    port: dbUrl.port || 3306,
    user: dbUrl.username,
    password: dbUrl.password,
    database: dbUrl.pathname.slice(1), // Remove leading '/'
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    ssl: { rejectUnauthorized: false }, // Required for Heroku cloud MySQL
  });
  console.log('Database: Connected via cloud URL (Heroku/JawsDB)');
} else {
  // Local development — use individual .env variables
  pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'car_service_advisor',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  });
  console.log('Database: Connected via local .env config');
}

// Example endpoint returning all car models (assuming a table `car_models` exists)
app.get('/api/models', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM car_models');
    res.json(rows);
  } catch (err) {
    console.error('DB error:', err);
    res.status(500).json({ error: 'Database query failed' });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date() });
});

// Config endpoint to fetch environment variables (keys are never sent to browser)
app.get('/api/config', (req, res) => {
  res.json({
    hasGeminiKey: !!process.env.GEMINI_API_KEY,
    googleClientId: process.env.GOOGLE_CLIENT_ID || ''
  });
});

// ─── GOOGLE OAUTH ENDPOINT ────────────────────────────────────────────────────
// Verifies a real Google ID token from Google Identity Services (GIS)
// and logs in (or auto-registers) the user.
app.post('/api/users/google-auth', async (req, res) => {
  const { credential } = req.body;
  if (!credential) {
    return res.status(400).json({ error: 'Google credential token is required' });
  }
  if (!process.env.GOOGLE_CLIENT_ID) {
    return res.status(500).json({ error: 'Google OAuth is not configured on this server.' });
  }

  try {
    // 1. Verify the ID token with Google's servers
    const ticket = await googleClient.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    const email    = (payload.email || '').toLowerCase().trim();
    const fullName = payload.name || email.split('@')[0];
    const picture  = payload.picture || '';

    if (!email) {
      return res.status(400).json({ error: 'Could not extract email from Google token' });
    }

    // 2. Look up or create user in the database
    const [existing] = await pool.query(
      'SELECT userID, username, fullName, email, phoneNum, role FROM users WHERE email = ?',
      [email]
    );

    if (existing.length > 0) {
      // Existing user — return their profile
      return res.json(existing[0]);
    }

    // 3. New user — auto-register as Customer
    const connection = await pool.getConnection();
    try {
      await connection.beginTransaction();

      const userID     = 'u' + Date.now().toString(36);
      const customerID = 'c' + Date.now().toString(36);
      const username   = email.split('@')[0].replace(/[^a-z0-9]/gi, '').toLowerCase() || 'user' + Date.now().toString(36);
      // Google accounts have no password — store an empty bcrypt hash placeholder
      const emptyHash  = await bcrypt.hash('', 12);

      await connection.query(
        'INSERT INTO users (userID, username, fullName, email, password, phoneNum, role) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [userID, username, fullName, email, emptyHash, '', 'Customer']
      );
      await connection.query(
        'INSERT INTO customers (customerID, userID) VALUES (?, ?)',
        [customerID, userID]
      );

      await connection.commit();

      const newUser = { userID, username, fullName, email, phoneNum: '', role: 'Customer' };
      return res.json(newUser);
    } catch (dbErr) {
      await connection.rollback();
      throw dbErr;
    } finally {
      connection.release();
    }
  } catch (err) {
    console.error('Google auth error:', err.message);
    return res.status(401).json({ error: 'Invalid or expired Google token. Please try again.' });
  }
});

// Chatbot endpoint to interact with Gemini API
app.post('/api/chatbot', async (req, res) => {
  const { message, history } = req.body;
  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'Gemini API key is not configured on the server.' });
  }

  // 1. Fetch live context from database
  let dbContext = '';
  try {
    const [models] = await pool.query('SELECT modelID, brand, modelName FROM car_models');
    const [parts] = await pool.query('SELECT partID, partName, partCode, price, isMandatory FROM service_parts');
    
    dbContext = `
Here is the live database context of our workshop:
1. Supported Perodua Car Models:
${models.map(m => `- ${m.brand} ${m.modelName} (ID: ${m.modelID})`).join('\n')}

2. Live Parts Inventory & Standard Pricing:
${parts.map(p => `- ${p.partName} (${p.partCode}): RM ${parseFloat(p.price).toFixed(2)} [${p.isMandatory ? 'Mandatory' : 'Optional'}]`).join('\n')}
`;
  } catch (dbErr) {
    console.warn("Could not load DB context for chatbot, using default:", dbErr);
  }

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: 'gemini-2.0-flash',
      systemInstruction: `You are CarCare AI Advisor, a professional and comprehensive automotive expert. You provide reliable, detailed, and professional answers to ALL inquiries regarding automotive knowledge, car specifications, engine stats, model histories, troubleshooting, diagnostics, and maintenance milestones.

Guidelines:
1. SPECIFICATION & GENERAL KNOWLEDGE: You are highly knowledgeable about car specs, engines, transmissions, torque, horsepower, fuel efficiency, safety systems (e.g., Perodua A.S.A., ABS, airbags), dimensions, and general automotive history. Answer any general car queries using your internal knowledge.
2. LIVE WORKSHOP CONTEXT: When users ask about parts, costs, or services available at our workshop, refer to the database context below. Standard prices are in RM (Ringgit Malaysia). Always quote these exact database prices if the part is in our inventory. If a part/service is not in our database, clearly state it's a general estimate and not in our standard inventory.
3. INTERACTIVE DIAGNOSTICS: If a user describes a symptom (e.g., squealing brakes, check engine light), use a logical diagnostic troubleshooting flowchart. Ask clarifying questions (such as mileage, symptoms, exact car model) when necessary.
4. SAFETY WARNINGS: For critical safety issues (e.g., brake failure symptoms, engine overheating), always include prominent bold safety warnings.
5. FORMATTING: Use clean Markdown with structured headings, lists, and bold text to ensure high readability.

Live Workshop Database Context:
${dbContext}`
    });

    // Map history to SDK-expected format
    const mappedHistory = (history || []).map(h => ({
      role: h.role === 'user' ? 'user' : 'model',
      parts: [{ text: h.text }]
    }));

    const chat = model.startChat({
      history: mappedHistory
    });

    const result = await chat.sendMessage(message);
    const response = await result.response;
    const reply = response.text();

    res.json({ reply });
  } catch (error) {
    console.error('Full API Error:', {
      status: error.status,
      message: error.message,
      details: error.response?.data || error
    });
    // Send a generic message — never expose raw error.message to the frontend
    res.status(500).json({
      error: 'AI service is temporarily unavailable. Please try again in a moment.'
    });
  }
});

// Create Quotation endpoint
app.post('/api/quotes', async (req, res) => {
  const { quoteID, customerID, variantID, mileage, region, totalCost, quoteDate, items } = req.body;
  if (!quoteID || !customerID || !variantID || !items || !Array.isArray(items)) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();

    // 1. Check if it's an update or insert
    const [existing] = await connection.query('SELECT quoteID FROM quotations WHERE quoteID = ?', [quoteID]);
    
    if (existing.length > 0) {
      // Update
      await connection.query(
        'UPDATE quotations SET variantID = ?, mileage = ?, region = ?, totalCost = ?, quoteDate = ? WHERE quoteID = ?',
        [variantID, mileage, region, totalCost, quoteDate, quoteID]
      );
      // Delete old parts
      await connection.query('DELETE FROM quotation_parts WHERE quoteID = ?', [quoteID]);
    } else {
      // Insert
      await connection.query(
        'INSERT INTO quotations (quoteID, customerID, variantID, mileage, region, totalCost, quoteDate) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [quoteID, customerID, variantID, mileage, region, totalCost, quoteDate]
      );
    }

    // 2. Insert items
    for (const item of items) {
      await connection.query(
        'INSERT INTO quotation_parts (quotePartID, quoteID, partName, partCode, price, quantity, itemType, subtotal) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
        [item.quotePartID, item.quoteID, item.partName, item.partCode, item.price, item.quantity, item.itemType, item.subtotal]
      );
    }

    await connection.commit();
    res.json({ message: 'Quotation saved successfully', quoteID });
  } catch (err) {
    await connection.rollback();
    console.error('Failed to save quote:', err);
    res.status(500).json({ error: 'Failed to save quotation to database' });
  } finally {
    connection.release();
  }
});

// ─── PARTS API ENDPOINTS ──────────────────────────────────────────────────
// Get all parts
app.get('/api/parts', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM service_parts');
    res.json(rows);
  } catch (err) {
    console.error('Failed to fetch parts:', err);
    res.status(500).json({ error: 'Database query failed' });
  }
});

// Add a new part
app.post('/api/parts', async (req, res) => {
  const { partID, categoryID, partName, partCode, price, isMandatory } = req.body;
  if (!partID || !categoryID || !partName || !partCode) {
    return res.status(400).json({ error: 'Missing required part fields' });
  }
  try {
    await pool.query(
      'INSERT INTO service_parts (partID, categoryID, partName, partCode, price, isMandatory) VALUES (?, ?, ?, ?, ?, ?)',
      [partID, categoryID, partName, partCode, price || 0, isMandatory ? 1 : 0]
    );
    res.json({ message: 'Part added successfully' });
  } catch (err) {
    console.error('Failed to add part:', err);
    res.status(500).json({ error: 'Failed to insert part into database' });
  }
});

// Update an existing part
app.put('/api/parts/:id', async (req, res) => {
  const { id } = req.params;
  const { partName, partCode, price, isMandatory } = req.body;
  try {
    await pool.query(
      'UPDATE service_parts SET partName = ?, partCode = ?, price = ?, isMandatory = ? WHERE partID = ?',
      [partName, partCode, price || 0, isMandatory ? 1 : 0, id]
    );
    res.json({ message: 'Part updated successfully' });
  } catch (err) {
    console.error('Failed to update part:', err);
    res.status(500).json({ error: 'Failed to update part in database' });
  }
});

// Delete a part
app.delete('/api/parts/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM service_parts WHERE partID = ?', [id]);
    res.json({ message: 'Part deleted successfully' });
  } catch (err) {
    console.error('Failed to delete part:', err);
    res.status(500).json({ error: 'Failed to delete part from database' });
  }
});

// ─── USERS API ENDPOINTS ──────────────────────────────────────────────────
// Get all users
app.get('/api/users', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT userID, username, fullName, email, phoneNum, role, createdAt FROM users');
    res.json(rows);
  } catch (err) {
    console.error('Failed to fetch users:', err);
    res.status(500).json({ error: 'Database query failed' });
  }
});

// Login (authenticate user)
app.post('/api/users/login', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }
  try {
    // Fetch the user record (include hashed password for comparison)
    const [rows] = await pool.query(
      'SELECT userID, username, fullName, email, phoneNum, role, password AS hashedPassword FROM users WHERE (username = ? OR email = ?)',
      [username, username]
    );
    if (rows.length === 0) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }
    const user = rows[0];

    // Securely compare the provided password with the stored hash
    const passwordMatch = await bcrypt.compare(password, user.hashedPassword);
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    // Never send the password hash back to the client
    const { hashedPassword, ...safeUser } = user;
    res.json(safeUser);
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Login failed' });
  }
});

// Register a new user
app.post('/api/users/register', async (req, res) => {
  const { userID, username, fullName, email, password, phoneNum, role } = req.body;
  if (!userID || !username || !fullName || !email || !password) {
    return res.status(400).json({ error: 'Missing required registration fields' });
  }
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();

    // Hash the password before storing — NEVER store plain text passwords
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    await connection.query(
      'INSERT INTO users (userID, username, fullName, email, password, phoneNum, role) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [userID, username, fullName, email, hashedPassword, phoneNum || '', role || 'Customer']
    );

    // If role is Customer, also insert into customers table
    if (!role || role === 'Customer') {
      const customerID = 'c' + Date.now().toString(36);
      await connection.query(
        'INSERT INTO customers (customerID, userID) VALUES (?, ?)',
        [customerID, userID]
      );
    }

    // If role is Employee or Admin, also insert into employees table
    if (role === 'Employee' || role === 'Admin' || role === 'Administrator') {
      const employeeID = 'e' + Date.now().toString(36);
      await connection.query(
        'INSERT INTO employees (employeeID, userID, position, managerID) VALUES (?, ?, ?, NULL)',
        [employeeID, userID, role === 'Admin' || role === 'Administrator' ? 'Admin' : 'Employee']
      );
    }

    await connection.commit();
    res.json({ message: 'User registered successfully', userID });
  } catch (err) {
    await connection.rollback();
    console.error('Registration error:', err);
    if (err.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ error: 'Username or email already exists' });
    }
    res.status(500).json({ error: 'Registration failed' });
  } finally {
    connection.release();
  }
});

// Delete a user
app.delete('/api/users/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM users WHERE userID = ?', [id]);
    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    console.error('Failed to delete user:', err);
    res.status(500).json({ error: 'Failed to delete user' });
  }
});

// ─── EMPLOYEES API ENDPOINTS ─────────────────────────────────────────────
app.get('/api/employees', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM employees');
    res.json(rows);
  } catch (err) {
    console.error('Failed to fetch employees:', err);
    res.status(500).json({ error: 'Database query failed' });
  }
});

// ─── CUSTOMERS API ENDPOINTS ─────────────────────────────────────────────
app.get('/api/customers', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM customers');
    res.json(rows);
  } catch (err) {
    console.error('Failed to fetch customers:', err);
    res.status(500).json({ error: 'Database query failed' });
  }
});

// ─── CAR MODELS API ENDPOINTS ────────────────────────────────────────────
// (GET /api/models already exists above)

// ─── CAR VARIANTS API ENDPOINTS ──────────────────────────────────────────
app.get('/api/variants', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM car_variants');
    res.json(rows);
  } catch (err) {
    console.error('Failed to fetch variants:', err);
    res.status(500).json({ error: 'Database query failed' });
  }
});

// ─── QUOTATIONS GET & DELETE ENDPOINTS ───────────────────────────────────
app.get('/api/quotes', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM quotations ORDER BY createdAt DESC');
    res.json(rows);
  } catch (err) {
    console.error('Failed to fetch quotes:', err);
    res.status(500).json({ error: 'Database query failed' });
  }
});

app.get('/api/quotes/:id/parts', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM quotation_parts WHERE quoteID = ?', [req.params.id]);
    res.json(rows);
  } catch (err) {
    console.error('Failed to fetch quote parts:', err);
    res.status(500).json({ error: 'Database query failed' });
  }
});

app.delete('/api/quotes/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM quotations WHERE quoteID = ?', [req.params.id]);
    res.json({ message: 'Quotation deleted successfully' });
  } catch (err) {
    console.error('Failed to delete quote:', err);
    res.status(500).json({ error: 'Failed to delete quotation' });
  }
});

// ─── SERVICE CATEGORIES API ENDPOINTS ────────────────────────────────────
app.get('/api/categories', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM service_categories');
    res.json(rows);
  } catch (err) {
    console.error('Failed to fetch categories:', err);
    res.status(500).json({ error: 'Database query failed' });
  }
});

// ─── KNOWLEDGE BLOCKS API ENDPOINTS ──────────────────────────────────────
app.get('/api/knowledge', async (req, res) => {
  try {
    const [blocks] = await pool.query('SELECT * FROM knowledge_blocks');
    const [signs] = await pool.query('SELECT * FROM knowledge_warning_signs');
    
    // Merge warning signs into their parent blocks
    const result = blocks.map(b => ({
      ...b,
      warningSigns: signs.filter(s => s.blockID === b.blockID).map(s => s.warnSign)
    }));
    res.json(result);
  } catch (err) {
    console.error('Failed to fetch knowledge blocks:', err);
    res.status(500).json({ error: 'Database query failed' });
  }
});

app.put('/api/knowledge/:id', async (req, res) => {
  const { id } = req.params;
  const { blockTitle, description, whyItMatters, maintenanceTip, didYouKnow, costEstimate, difficultyLevel, urgency, warningSigns } = req.body;
  
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();

    await connection.query(
      `UPDATE knowledge_blocks SET blockTitle = ?, description = ?, whyItMatters = ?, maintenanceTip = ?, 
       didYouKnow = ?, costEstimate = ?, difficultyLevel = ?, urgency = ? WHERE blockID = ?`,
      [blockTitle, description, whyItMatters, maintenanceTip, didYouKnow, costEstimate, difficultyLevel, urgency, id]
    );

    // Delete existing warning signs for this block
    await connection.query('DELETE FROM knowledge_warning_signs WHERE blockID = ?', [id]);

    // Insert new warning signs if provided
    if (Array.isArray(warningSigns) && warningSigns.length > 0) {
      for (const sign of warningSigns) {
        await connection.query(
          'INSERT INTO knowledge_warning_signs (blockID, warnSign) VALUES (?, ?)',
          [id, sign]
        );
      }
    }

    await connection.commit();
    res.json({ message: 'Knowledge block and warning signs updated successfully' });
  } catch (err) {
    await connection.rollback();
    console.error('Failed to update knowledge block:', err);
    res.status(500).json({ error: 'Failed to update knowledge block' });
  } finally {
    connection.release();
  }
});

// ─── SERVICE CENTERS API ENDPOINTS ───────────────────────────────────────
app.get('/api/centers', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM service_centers');
    res.json(rows);
  } catch (err) {
    console.error('Failed to fetch service centers:', err);
    res.status(500).json({ error: 'Database query failed' });
  }
});

const PORT = process.env.PORT || 3000;
// Bind to 0.0.0.0 so Heroku (and other cloud platforms) can route traffic in
const server = app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});

// ─── GRACEFUL SHUTDOWN ────────────────────────────────────────────────────────
// Heroku sends SIGTERM before shutting down a dyno — handle it cleanly
process.on('SIGTERM', () => {
  console.log('SIGTERM received — shutting down gracefully');
  server.close(() => {
    console.log('HTTP server closed');
    pool.end(() => {
      console.log('Database pool closed');
      process.exit(0);
    });
  });
});

process.on('SIGINT', () => {
  console.log('SIGINT received — shutting down gracefully');
  server.close(() => {
    pool.end(() => process.exit(0));
  });
});