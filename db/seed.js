/**
 * db/seed.js
 * Runs init.sql against the connected database.
 * Used as the Heroku postdeploy hook to create tables and insert seed data.
 * Works with both local .env and Heroku JAWSDB_URL / DATABASE_URL.
 */
require("dotenv").config();
const fs   = require("fs");
const path = require("path");
const mysql = require("mysql2/promise");

async function seed() {
  // ─── Build connection config (same logic as server.js) ───────────────────────
  let connConfig;
  const cloudDbUrl = process.env.JAWSDB_URL || process.env.DATABASE_URL;

  if (cloudDbUrl) {
    const dbUrl = new URL(cloudDbUrl);
    connConfig = {
      host:     dbUrl.hostname,
      port:     dbUrl.port || 3306,
      user:     dbUrl.username,
      password: dbUrl.password,
      database: dbUrl.pathname.slice(1),
      ssl:      { rejectUnauthorized: false },
      multipleStatements: true, // Required to run the whole SQL file at once
    };
    console.log("Seed: using cloud DB URL (Heroku/JawsDB)");
  } else {
    connConfig = {
      host:               process.env.DB_HOST     || "localhost",
      user:               process.env.DB_USER     || "root",
      password:           process.env.DB_PASSWORD || "",
      database:           process.env.DB_NAME     || "car_service_advisor",
      multipleStatements: true,
    };
    console.log("Seed: using local .env config");
  }

  // ─── Read init.sql ────────────────────────────────────────────────────────────
  const sqlFile = path.join(__dirname, "init.sql");
  const sql = fs.readFileSync(sqlFile, "utf8");

  // ─── Connect and run ──────────────────────────────────────────────────────────
  let conn;
  try {
    conn = await mysql.createConnection(connConfig);
    console.log("Seed: connected to database.");
    await conn.query(sql);
    console.log("Seed: init.sql executed successfully. All tables and data are ready.");
  } catch (err) {
    console.error("Seed error:", err.message);
    process.exit(1);
  } finally {
    if (conn) await conn.end();
  }
}

seed();
