const config = require("../../config");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require('../user/model');

module.exports = {
  isLoginIndex: (req, res, next) => {
    if (req.session.user === null || req.session.user === undefined) {
      req.flash(
        "alertMessage",
        `Mohon maaf session anda telah habis silahkan join kembali`
      );
      req.flash("alertStatus", "danger");
      res.redirect("/");
    } else {
      next();
    }
  },

  isLoginAdmin : async(req, res, next) => {
    try {
      const token = req.headers.authorization ? req.headers.authorization.replace('Bearer ', '') : null;

      const data = jwt.verify(token, config.jwtKey);

      const user = await User.findOne({_id : data.user.id});

      if(!user){
        throw new Error();
      }

      req.user = user
      req.token = token
      next()

    } catch (error) {
      res.status(401).json({
        error: 'Not Autorization to access this resource'
      })
    }
  }
};
