const mongoose = require("mongoose");

const lampuSchema = mongoose.Schema({
  lamp1: {
    type: String,
    enum: ["ON", "OFF"],
    default: "ON",
  },
  lamp2: {
    type: String,
    enum: ["ON", "OFF"],
    default: "ON",
  },
  status: {
    type: String,
    enum: ["ON", "OFF"],
    default: "ON",
  },
},{ timestamps: true });

module.exports = mongoose.model("Lamp", lampuSchema);
