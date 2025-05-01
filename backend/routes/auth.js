const express = require("express");
const router = express.Router();

// Endpoint para iniciar OAuth2 (opcional si usás client-side OAuth)
router.get("/auth/redirect", (req, res) => {
  const redirectUri = `https://discord.com/oauth2/authorize?client_id=${process.env.CLIENT_ID}&redirect_uri=${process.env.REDIRECT_URI}&response_type=code&scope=identify+email`;
  return res.redirect(redirectUri);
});

module.exports = router;
