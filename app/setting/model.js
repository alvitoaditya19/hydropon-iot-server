const mongoose = require("mongoose");

let settingSchema = mongoose.Schema({
  nameVegetable: {
    type: String,
    require: [true, "Vegetable Harus Diisi"],
  },
  amaountVegetable: {
    type: Number,
    require: [true, "Vegetable Harus Diisi"],
  },
  nameHarvest: {
    type: String,
    require: [true, "Harvest Celcius Harus Diisi"],
  },
  amountHarvest: {
    type: Number,
    require: [true, "Harvest Celcius Harus Diisi"],
  },
},{ timestamps: true });

module.exports = mongoose.model("Setting", settingSchema);