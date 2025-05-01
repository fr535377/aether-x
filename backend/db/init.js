const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./database.sqlite");

// Tablas necesarias
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS config (
      server_id TEXT PRIMARY KEY,
      email_required INTEGER DEFAULT 1,
      phone_required INTEGER DEFAULT 1,
      save_ip INTEGER DEFAULT 1,
      save_phone INTEGER DEFAULT 1,
      vpnblock INTEGER DEFAULT 0,
      browserblock INTEGER DEFAULT 0,
      mailblock INTEGER DEFAULT 0,
      phoneblock TEXT DEFAULT '',
      flagsblock INTEGER DEFAULT 0,
      attempts INTEGER DEFAULT 3,
      blocktime INTEGER DEFAULT 3600,
      embed_title TEXT,
      embed_desc TEXT,
      embed_footer TEXT,
      embed_color TEXT,
      embed_image TEXT,
      button1_label TEXT,
      button1_url TEXT,
      button2_label TEXT,
      button2_url TEXT
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS verifications (
      user_id TEXT,
      username TEXT,
      email TEXT,
      phone_number TEXT,
      ip TEXT,
      flags TEXT,
      browser TEXT,
      vpn INTEGER,
      server_id TEXT,
      timestamp INTEGER
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS blacklist (
      user_id TEXT,
      email TEXT,
      phone_number TEXT,
      ip TEXT,
      server_id TEXT
    )
  `);
});

module.exports = db;
