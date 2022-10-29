const mongoose = require("mongoose");

let kridaDataSchema = mongoose.Schema({
  keruhAir: {
    type: String,
    require: [true, "Keruh Air Harus Diisi"],
    
  },
  suhuAir: {
    type: String,
    require: [true, "Suhu Air Harus Diisi"],
  },
},{ timestamps: true });

module.exports = mongoose.model("KridaData", kridaDataSchema);
