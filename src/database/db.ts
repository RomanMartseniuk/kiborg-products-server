import Database from 'better-sqlite3';

export const db = new Database('store.db');

// Увімкнути foreign keys
db.pragma('foreign_keys = ON');

export function initDB() {
   db.exec(`
    CREATE TABLE IF NOT EXISTS categories (
      id INTEGER PRIMARY KEY,
      name TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS products (
      id TEXT PRIMARY KEY,
      groupId TEXT,
      available TEXT,

      url TEXT NOT NULL,

      price REAL NOT NULL,
      optPrice REAL,
      dropPrice REAL,

      currencyId TEXT NOT NULL,
      categoryId INTEGER NOT NULL,

      pictures TEXT, -- JSON

      vendorCode TEXT,
      vendor TEXT,

      name TEXT NOT NULL,
      description TEXT NOT NULL,

      FOREIGN KEY (categoryId) REFERENCES categories(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
    );
  `);
}
