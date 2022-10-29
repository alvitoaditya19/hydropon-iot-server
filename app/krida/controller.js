const DataSensor = require("./model");
const { Parser } = require("json2csv");

module.exports = {
  getTemp: async (req, res, next) => {
    try {
     
      const temperature = await DataSensor.find({});

      res.status(201).json({
        data: temperature,
      });
    } catch (err) {
      res.status(500).json({
        message: err.message || `Internal Server Error`,
      });
    }
  },
  postSuhu: async (req, res, next) => {
    try {
      const { keruhAir, suhuAir } = req.body;

      const payload = {
        keruhAir: keruhAir,
        suhuAir: suhuAir,
      };

      const data = new DataSensor(payload);
      await data.save();

      res.status(200).json({ data: data });
    } catch (err) {
      res.status(500).json({
        message: err.message || `Internal Server Error`,
      });
    }
  },
};
