const Suhu = require("../temperature/model")
const { Parser } = require("json2csv")

module.exports = {
  getAll: async (req, res, next) => {
        try {
            const suhu = await Suhu.find()

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
}
