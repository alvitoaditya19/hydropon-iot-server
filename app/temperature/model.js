const mongoose = require("mongoose");

let temperatureSchema = mongoose.Schema({
  humidity: {
    type: String,
    require: [true, "Humidity Harus Diisi"],
    
  },
  celcius: {
    type: String,
    require: [true, "Suhu Celcius Harus Diisi"],
  },
},{ timestamps: true });

module.exports = mongoose.model("Temperature", temperatureSchema);
