var express = require("express");
var router = express.Router();
const { getAll } = require("./controller");
const { isLoginAdmin } = require('../middleware/auth');
const multer = require("multer");
const os = require("os");

// API
router.get("/", getAll);

module.exports = router;
 