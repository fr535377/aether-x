const express = require("express");
const router = express.Router();
const { addToBlacklist, removeFromBlacklist } = require("../db/queries");

router.post("/blacklist/add", async (req, res) => {
  await addToBlacklist(req.body);
  res.json({ success: true });
});

router.post("/blacklist/remove", async (req, res) => {
  await removeFromBlacklist(req.body.user_id);
  res.json({ success: true });
});

module.exports = router;
