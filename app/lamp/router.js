var express = require("express");
var router = express.Router();

const multer = require("multer");
const { isLoginAdmin,isLoginUser } = require("../middleware/auth");

const os = require("os");
const { actionStatusLamp1, getStatusLamp1 } = require("./controller");

router.get("/", getStatusLamp1);
router.put("/", actionStatusLamp1);


module.exports = router;
