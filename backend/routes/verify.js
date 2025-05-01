const express = require("express");
const router = express.Router();
const { saveVerification } = require("../db/queries");
const { checkSecurity } = require("../services/securityCheck");

router.post("/verify", async (req, res) => {
  const { user, ip } = req.body;

  const issues = await checkSecurity(user, ip);
  if (issues.length > 0) {
    return res.status(403).json({ success: false, reason: issues[0] });
  }

  await saveVerification(user);
  return res.json({ success: true });
});

module.exports = router;
