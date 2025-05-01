const db = require("./init");

function getConfig(serverId) {
  return new Promise((resolve, reject) => {
    db.get("SELECT * FROM config WHERE server_id = ?", [serverId], (err, row) => {
      if (err) return reject(err);
      if (!row) {
        db.run("INSERT INTO config (server_id) VALUES (?)", [serverId]);
        return resolve({});
      }
      resolve(row);
    });
  });
}

function updateConfig(serverId, values) {
  const keys = Object.keys(values);
  const updates = keys.map(k => `${k} = ?`).join(", ");
  const params = [...keys.map(k => values[k]), serverId];

  return new Promise((resolve, reject) => {
    db.run(`UPDATE config SET ${updates} WHERE server_id = ?`, params, function (err) {
      if (err) return reject(err);
      resolve(true);
    });
  });
}

function saveVerification(data) {
  return new Promise((resolve, reject) => {
    db.run(`
      INSERT INTO verifications (user_id, username, email, phone_number, ip, flags, browser, vpn, server_id, timestamp)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        data.user_id,
        data.username,
        data.email,
        data.phone_number,
        data.ip,
        JSON.stringify(data.flags || []),
        data.browser || "unknown",
        data.vpn ? 1 : 0,
        data.server_id,
        Date.now()
      ],
      (err) => {
        if (err) return reject(err);
        resolve(true);
      }
    );
  });
}

function addToBlacklist(data) {
  return new Promise((resolve, reject) => {
    db.run(`
      INSERT INTO blacklist (user_id, email, phone_number, ip, server_id)
      VALUES (?, ?, ?, ?, ?)`,
      [
        data.user_id,
        data.email,
        data.phone_number,
        data.ip,
        data.server_id
      ],
      (err) => {
        if (err) return reject(err);
        resolve(true);
      }
    );
  });
}

function removeFromBlacklist(userId) {
  return new Promise((resolve, reject) => {
    db.run("DELETE FROM blacklist WHERE user_id = ?", [userId], (err) => {
      if (err) return reject(err);
      resolve(true);
    });
  });
}

module.exports = {
  getConfig,
  updateConfig,
  saveVerification,
  addToBlacklist,
  removeFromBlacklist
};
