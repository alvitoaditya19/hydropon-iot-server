const Suhu = require("./model")
const { Parser } = require("json2csv")

module.exports = {
    getSuhu: async (req, res, next) => {
        try {

            const suhu = await Suhu.find()

            //  AWAL TO AKHIR
            suhu.sort(function (a, b) {
                var keyA = new Date(a.updatedAt),
                    keyB = new Date(b.updatedAt)
                // Compare the 2 dates
                if (keyA < keyB) return -1
                if (keyA > keyB) return 1
                return 0
            })

            // AKHIR TO AWAL
            // suhu.sort(function(a, b) {
            //   var keyA = new Date(a.updatedAt),
            //     keyB = new Date(b.updatedAt);
            //   // Compare the 2 dates
            //   if (keyA < keyB) return 1;
            //   if (keyA > keyB) return -1;
            //   return 0;
            // });

            res.status(200).json({ data: suhu })
        } catch (err) {
            res.status(500).json({
                message: err.message || `Internal Server Error`,
            })
        }
    },
    postSuhu: async (req, res, next) => {
        try {
            const { celcius, humidity } = req.body

            const payload = {
                celcius: celcius,
                humidity: humidity,
            }

            const suhu = new Suhu(payload)
            await suhu.save()

            res.status(200).json({ data: suhu })
        } catch (err) {
            res.status(500).json({
                message: err.message || `Internal Server Error`,
            })
        }
    },
    // updateSuhu: async (req, res, next) => {
    //     try {
    //         const { id } = req.params
    //         const { celcius = "", humidity = "" } = req.body

    //         const payload = {}

    //         if (celcius.length) payload.celcius = celcius
    //         if (humidity.length) payload.humidity = humidity

    //         const suhu = await Suhu.findOneAndUpdate(
    //             {
    //                 _id: "6237c861f31ee9b6d302f2f9",
    //             },
    //             payload,
    //             { new: true, runValidators: true }
    //         )

    //         res.status(201).json({
    //             data: {
    //                 id: suhu.id,
    //                 celcius: suhu.celcius,
    //                 humidity: suhu.humidity,
    //             },
    //         })
    //     } catch (err) {
    //         res.status(500).json({
    //             message: err.message || `Internal Server Error`,
    //         })
    //     }
    // },
    // actionConvertCSV: async (req, res) => {
    //     const suhu = await Suhu.find().select(
    //         "celcius humidity humidity createdAt updatedAt"
    //     )

    //     const fields = [
    //         "celcius",
    //         "humidity",
    //         "humidity",
    //         "createdAt",
    //         "updatedAt",
    //     ]

    //     const json2csvParser = new Parser({ fields })
    //     const csv = json2csvParser.parse(suhu)

    //     console.log(csv)

    //     res.header("Content-Type", "text/csv")
    //     res.attachment("data-suhu.csv")
    //     return res.send(csv)
    // },
}
