// Backend/database.js
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('orders.db');

// Create table if not exists
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS orders (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      customerName TEXT,
      phoneNumber INTEGER,
      address TEXT,
      preferreddeliverydate DATE,
      items TEXT,
      totalAmount REAL,
      orderDate TEXT
    )
  `);
});

module.exports = db;
