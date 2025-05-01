const express = require("express");
const router = express.Router();

router.use(require("./auth"));
router.use(require("./verify"));
router.use(require("./config"));
router.use(require("./blacklist"));

module.exports = router;
