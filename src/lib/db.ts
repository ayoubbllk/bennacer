import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';

const DB_DIR = path.join(process.cwd(), 'data');
const DB_PATH = path.join(DB_DIR, 'shows.db');

// Ensure data directory exists
if (!fs.existsSync(DB_DIR)) {
  fs.mkdirSync(DB_DIR, { recursive: true });
}

const db = new Database(DB_PATH);

// Enable WAL mode for better concurrent read performance
db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');

// Create tables if they don't exist
db.exec(`
  CREATE TABLE IF NOT EXISTS shows (
    id TEXT PRIMARY KEY,
    date TEXT NOT NULL,
    month TEXT NOT NULL,
    year TEXT NOT NULL,
    venue TEXT NOT NULL,
    city TEXT NOT NULL,
    country TEXT NOT NULL,
    image TEXT NOT NULL DEFAULT '',
    status TEXT NOT NULL CHECK(status IN ('available', 'few-left', 'sold-out')) DEFAULT 'available',
    ticketUrl TEXT NOT NULL DEFAULT '#',
    time TEXT NOT NULL DEFAULT '',
    address TEXT NOT NULL DEFAULT '',
    description TEXT NOT NULL DEFAULT '',
    duration TEXT NOT NULL DEFAULT '',
    price TEXT NOT NULL DEFAULT '',
    created_at TEXT NOT NULL DEFAULT (datetime('now')),
    updated_at TEXT NOT NULL DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS admin (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL
  );
`);

export default db;
