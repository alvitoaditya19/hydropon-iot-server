const Settings = require("./model");

module.exports = {
  actionEdit: async (req, res) => {
    try {
      const { id } = req.params;
      const { nameVegetable, amaountVegetable, nameHarvest, amountHarvest } =
        req.body;

      await Vegetable.findOneAndUpdate(
        {
          _id: id,
        },
        { nameVegetable, amaountVegetable, nameHarvest, amountHarvest }
      );
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
