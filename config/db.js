const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, '../projectTracker.db');

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) return console.error('DB connection failed:', err.message);
  console.log(' SQLite connected at', dbPath);
});

// Initialize tables
db.serialize(() => {
 
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
    user_id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role TEXT DEFAULT 'user'
  );

  `);
  db.run(
    `
   CREATE TABLE IF NOT EXISTS Projects (
    project_id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT,
    user_id INTEGER NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
  );`
  )
});

module.exports = db;
