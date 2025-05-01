const fs = require("fs");
const path = require("path");

function log(type = "info", message = "") {
  const timestamp = new Date().toISOString();
  const logMsg = `[${timestamp}] [${type.toUpperCase()}] ${message}\n`;
  fs.appendFile(path.join(__dirname, "../../logs.log"), logMsg, (err) => {
    if (err) console.error("Failed to write log:", err);
  });
}

module.exports = { log };
