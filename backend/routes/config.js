const express = require("express");
const router = express.Router();
const { updateConfig, getConfig } = require("../db/queries");

router.get("/config/:serverId", async (req, res) => {
  const config = await getConfig(req.params.serverId);
  res.json(config);
});

router.post("/config/:serverId", async (req, res) => {
  await updateConfig(req.params.serverId, req.body);
  res.json({ success: true });
});

module.exports = router;
