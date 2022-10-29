var express = require("express");
var router = express.Router();
const { getTemp, postSuhu, actionConvertCSV, iseng } = require("./controller");
const { isLoginAdmin } = require('../middleware/auth');
const multer = require("multer");
const os = require("os");

// API
router.post("/post", postSuhu);
router.get("/get", getTemp);

// router.put("/put", updateSuhu);

module.exports = router;
 