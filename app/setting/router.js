var express = require("express");
var router = express.Router();
const { actionEdit } = require("./controller");
const { isLoginAdmin } = require('../middleware/auth');
const multer = require("multer");
const os = require("os");

// API
router.get("/settings",isLoginAdmin, getTemp);
router.put("/edit/:id",isLoginAdmin, actionEdit);
// router.put("/put", updateSuhu);

module.exports = router;
 