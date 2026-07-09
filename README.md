# Web-Based Automated Car Service Advisor

## Local Development Setup (localhost)

### Prerequisites
- **Node.js** (v18+ recommended)
- **MySQL / MariaDB** (installed via Laragon or any local MySQL server)
- **Git** (optional, for version control)

### Steps
1. **Open a terminal** in the project root:
   ```bash
   cd "c:/Users/ASUS/Documents/UiTM (DEGREE)/SEM 5/FYP/Web-Based Automated Car Service Advisor"
   ```
2. **Install Node dependencies**:
   ```bash
   npm install
   ```
3. **Create the database** (run the SQL script):
   ```bash
   mysql -u root -p < db/init.sql
   ```
   - Adjust the user/password if needed.
4. **Configure environment variables** (already in `.env`).
   - If your MySQL password is not empty, edit `.env` accordingly.
5. **Start the server**:
   - Development mode (auto‑restart on changes):
     ```bash
     npm run dev
     ```
   - Production mode:
     ```bash
     npm start
     ```
6. Open your browser and navigate to **http://localhost:3000**. All existing HTML pages (`index.html`, `quotes.html`, etc.) will be served.

### API Endpoints
- `GET /api/health` – health check (returns `{status:"ok"}`)
- `GET /api/models` – returns all rows from `car_models` table (sample data provided in the SQL script).

### Database Schema (sample)
```sql
CREATE DATABASE IF NOT EXISTS car_service_advisor;
USE car_service_advisor;

CREATE TABLE IF NOT EXISTS car_models (
  id INT AUTO_INCREMENT PRIMARY KEY,
  model_name VARCHAR(100) NOT NULL,
  variant VARCHAR(100),
  year INT
);

INSERT INTO car_models (model_name, variant, year) VALUES
('Myvi', 'Standard', 2022),
('Axia', 'Premium', 2021),
('Bezza', 'Sport', 2023);
```

### Notes & Tips
- The server serves static files directly from the project root, so you don't need to move HTML/CSS/JS into a `public/` folder.
- If you add more API routes, place them in `server.js` before the `app.listen` call.
- For production you may want to use a reverse proxy (e.g., Nginx) and enable HTTPS.

---
**Enjoy your local development environment!**
