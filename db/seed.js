const fs = require('fs');
const mysql = require('mysql2/promise');
require('dotenv').config();

// 1. Extract data from db-init.js
const storage = {};
global.localStorage = {
    getItem: (key) => storage[key] || null,
    setItem: (key, val) => { storage[key] = val; },
    removeItem: (key) => { delete storage[key]; }
};
global.window = {
    getTable: (name) => {
        const data = storage[name];
        return data ? JSON.parse(data) : [];
    },
    saveTable: (name, data) => {
        storage[name] = JSON.stringify(data);
    }
};

try {
    const code = fs.readFileSync('js/db-init.js', 'utf8');
    eval(code);
    console.log("Successfully extracted client-side tables.");
} catch (err) {
    console.error("Error executing db-init.js:", err);
    process.exit(1);
}

// 2. Connect to MySQL
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'car_service_advisor',
  waitForConnections: true,
  connectionLimit: 5,
});

async function run() {
    const conn = await pool.getConnection();
    try {
        console.log("Connected to MySQL database. Beginning seed...");

        // Disable foreign key checks during seed to prevent ordering issues
        await conn.query("SET FOREIGN_KEY_CHECKS = 0;");
        
        // Clear all tables to prevent duplicates
        const tables = [
            'users', 'employees', 'customers', 'car_models', 'car_variants',
            'service_categories', 'service_parts', 'service_schedules',
            'service_schedule_items', 'knowledge_blocks', 'knowledge_warning_signs',
            'service_centers'
        ];
        for (const table of tables) {
            await conn.query("TRUNCATE TABLE " + table + ";");
        }
        console.log("Cleaned existing data.");

        // A. Users
        const users = JSON.parse(storage['userTable'] || '[]');
        for (const u of users) {
            await conn.query(
                "INSERT INTO users (userID, username, fullName, email, password, phoneNum, role) VALUES (?, ?, ?, ?, ?, ?, ?)",
                [u.userID, u.username, u.fullName, u.email, u.password, u.phoneNum, u.role]
            );
        }
        console.log("Seeded " + users.length + " users.");

        // B. Employees
        const employees = JSON.parse(storage['employeeTable'] || '[]');
        for (const e of employees) {
            await conn.query(
                "INSERT INTO employees (employeeID, userID, position, managerID) VALUES (?, ?, ?, ?)",
                [e.employeeID, e.userID, e.position, e.managerID]
            );
        }
        console.log("Seeded " + employees.length + " employees.");

        // C. Customers
        const customers = JSON.parse(storage['customerTable'] || '[]');
        for (const c of customers) {
            await conn.query(
                "INSERT INTO customers (customerID, userID) VALUES (?, ?)",
                [c.customerID, c.userID]
            );
        }
        console.log("Seeded " + customers.length + " customers.");

        // D. Car Models
        const models = JSON.parse(storage['carModelTable'] || '[]');
        for (const m of models) {
            await conn.query(
                "INSERT INTO car_models (modelID, brand, modelName) VALUES (?, ?, ?)",
                [m.modelID, m.brand || 'Perodua', m.modelName]
            );
        }
        console.log("Seeded " + models.length + " car models.");

        // E. Car Variants
        const variants = JSON.parse(storage['carVariantTable'] || '[]');
        for (const v of variants) {
            await conn.query(
                "INSERT INTO car_variants (variantID, modelID, variantName) VALUES (?, ?, ?)",
                [v.variantID, v.modelID, v.variantName]
            );
        }
        console.log("Seeded " + variants.length + " car variants.");

        // F. Service Categories
        const categories = JSON.parse(storage['serviceCategoryTable'] || '[]');
        for (const cat of categories) {
            await conn.query(
                "INSERT INTO service_categories (categoryID, title, imagePath) VALUES (?, ?, ?)",
                [cat.categoryID, cat.title, cat.imagePath]
            );
        }
        console.log("Seeded " + categories.length + " service categories.");

        // G. Service Parts
        const parts = JSON.parse(storage['servicePartTable'] || '[]');
        for (const p of parts) {
            await conn.query(
                "INSERT INTO service_parts (partID, categoryID, partName, partCode, price, isMandatory) VALUES (?, ?, ?, ?, ?, ?)",
                [p.partID, p.categoryID, p.partName, p.partCode, p.price, p.isMandatory ? 1 : 0]
            );
        }
        console.log("Seeded " + parts.length + " service parts.");

        // H. Service Schedules and Service Schedule Items
        const schedules = JSON.parse(storage['serviceScheduleTable'] || '[]');
        let itemCounter = 0;
        for (const s of schedules) {
            const [res] = await conn.query(
                "INSERT INTO service_schedules (modelID, mileage, transmission, totalPeninsular, totalEM) VALUES (?, ?, ?, ?, ?)",
                [s.modelID, s.mileage, s.transmission || 'Any', s.totalPeninsular, s.totalEM]
            );
            const scheduleID = res.insertId;

            const items = s.items || [];
            for (const item of items) {
                await conn.query(
                    "INSERT INTO service_schedule_items (scheduleID, itemName, quantity, priceP, priceEM, itemType) VALUES (?, ?, ?, ?, ?, ?)",
                    [scheduleID, item.name, item.qty || 1, item.peninsular || 0.00, item.em || 0.00, item.type || 'Part']
                );
                itemCounter++;
            }
        }
        console.log("Seeded " + schedules.length + " schedules with " + itemCounter + " items total.");

        // I. Knowledge Blocks and Warning Signs
        const blocks = JSON.parse(storage['knowledgeBlockTable'] || '[]');
        let warningCounter = 0;
        for (const b of blocks) {
            await conn.query(
                "INSERT INTO knowledge_blocks (blockID, categoryID, employeeID, blockTitle, description, whyItMatters, maintenanceTip, didYouKnow, costEstimate, difficultyLevel, urgency) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
                [b.blockID, b.categoryID, b.employeeID || null, b.blockTitle, b.description, b.whyItMatters, b.maintenanceTip, b.didYouKnow, b.costEstimate, b.difficultyLevel || 'Moderate', b.urgency || 'Routine']
            );

            const signs = b.warningSigns || [];
            for (const sign of signs) {
                await conn.query(
                    "INSERT INTO knowledge_warning_signs (blockID, warnSign) VALUES (?, ?)",
                    [b.blockID, sign]
                );
                warningCounter++;
            }
        }
        console.log("Seeded " + blocks.length + " knowledge blocks with " + warningCounter + " warning signs.");

        // J. Service Centers
        const centers = JSON.parse(storage['serviceCenterTable'] || '[]');
        for (const c of centers) {
            await conn.query(
                "INSERT INTO service_centers (centerName, address, state, phone, lat, lng) VALUES (?, ?, ?, ?, ?, ?)",
                [c.name, c.address, c.state, c.phone, c.lat, c.lng]
            );
        }
        console.log("Seeded " + centers.length + " service centers.");

        // Re-enable foreign key checks
        await conn.query("SET FOREIGN_KEY_CHECKS = 1;");
        console.log("Database fully seeded successfully!");

    } catch (err) {
        console.error("Error during database seed:", err);
    } finally {
        conn.release();
        await pool.end();
    }
}

run();
