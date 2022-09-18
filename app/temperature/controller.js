const Temperature = require("./model");
const { Parser } = require("json2csv");

module.exports = {
  getTemp: async (req, res, next) => {
    try {
      let { limit = "" } = req.query;
      let { page = "" } = req.query;
      if (!limit) {
        limit = Infinity;
      }
      if (!page) {
        page = 1;
      }
      const temperature = await Temperature.find({});

      const timeTemp = temperature.map((suhuDataMap, index) => {
        const suhuCalender = new Date(suhuDataMap.createdAt);
        return {
          id: index + 1,
          celcius: suhuDataMap.celcius,
          humidity: suhuDataMap.humidity,
          date:
            suhuCalender.getDate() +
            " - " +
            (suhuCalender.getMonth() + 1) +
            " - " +
            suhuCalender.getFullYear(),
          time:
            suhuCalender.getHours() +
            ":" +
            suhuCalender.getMinutes() +
            ":" +
            suhuCalender.getSeconds(),
        };
      });
      const totalTemp = temperature.length;

      const startIndex = (page - 1) * limit;
      const endIndex = page * limit;
      const result = timeTemp.slice(startIndex, endIndex);

      res.status(201).json({
        total: totalTemp,
        data: result,
      });
    } catch (err) {
      res.status(500).json({
        message: err.message || `Internal Server Error`,
      });
    }
  },
  postSuhu: async (req, res, next) => {
    try {
      const { celcius, humidity } = req.body;

      const payload = {
        celcius: celcius,
        humidity: humidity,
      };

      const suhu = new Suhu(payload);
      await suhu.save();

      res.status(200).json({ data: suhu });
    } catch (err) {
      res.status(500).json({
        message: err.message || `Internal Server Error`,
      });
    }
  },
  actionConvertCSV: async (req, res) => {
    try {
      const temperature = await Temperature.find().select(
        "id humidity humidity createdAt updatedAt"
      );

      const customTemp = temperature.map((suhuDataMap, index) => {
        const suhuCalender = new Date(suhuDataMap.createdAt);
        return {
          id: index + 1,
          celcius: suhuDataMap.celcius,
          humidity: suhuDataMap.humidity,
          date:
            suhuCalender.getDate() +
            " - " +
            (suhuCalender.getMonth() + 1) +
            " - " +
            suhuCalender.getFullYear(),
          time:
            suhuCalender.getHours() +
            ":" +
            suhuCalender.getMinutes() +
            ":" +
            suhuCalender.getSeconds(),
        };
      });

      const fields = ["id", "celcius", "humidity", "date", "time"];

      const json2csvParser = new Parser({ fields });
      const csv = json2csvParser.parse(customTemp);

      console.log(csv);

      res.header("Content-Type", "text/csv");
      res.attachment("data-suhu.csv");
      return res.send(csv);
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
};
