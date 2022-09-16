const Lamp = require("./model");
const path = require("path");
const fs = require("fs");
const config = require("../../config");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { jwtKey } = require("../../config");
const { update } = require("./model");

module.exports = {
  actionStatusLamp1: async (req, res) => {
    try {
      const { lamp1,lamp2 } = req.body;
      // let lampu1Status = lampu.lampu1 === "ON" ? "OFF" : "ON";

     const lampuData = await Lamp.findOneAndUpdate(
        {
          _id: "62414bbd1a431cac0b339833",
        },
        { 
          lamp1,
          lamp2
        },
        { new: true, useFindAndModify: false }
      );

      res.status(200).json({ data: lampuData});
     
    } catch (err) {
      if (err && err.name === "ValidationError") {
        return res.status(422).json({
          error: 1,
          message: err.message,
          fields: err.errors,
        });
      }
      next(err);
    }
  },
  getStatusLamp1: async (req, res) => {
    try {

        const lamp = await Lamp.findOne({});
        res.status(200).json({ data: lamp });

    } catch (err) {
      res.status(500).json({
        message: err.message || `Internal Server Error`,
      });
    }
  },
};
