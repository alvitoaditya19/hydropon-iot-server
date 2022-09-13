var express = require("express");
var router = express.Router();
const { actionCreate, signin, getUser, actionEdit, actionDelete, detailUser } = require("./controller");
const multer = require("multer");
const { isLoginAdmin,isLoginUser } = require("../middleware/auth");

const os = require("os");

router.post("/signin", signin);

router.post("/create", multer({ dest: os.tmpdir() }).single("avatar"),actionCreate);
router.put(
  "/edit/:id",
  multer({ dest: os.tmpdir() }).single("avatar"),
  actionEdit
);

router.get("/", getUser);
router.get("/:id", detailUser);
router.delete("/:id", actionDelete);


module.exports = router;
