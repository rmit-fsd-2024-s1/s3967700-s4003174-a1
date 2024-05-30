const db = require("../database/index.js");

exports.getSpecials = async (req, res) => {
  try {
    const specials = await db.specials.findAll();
    res.status(200).send(specials);
  } catch (error) {
    res.status(500).send({ message: "Error fetching specials.", error: error.message });
  }
};

exports.createSpecial = async (req, res) => {
  const { SpecialName, Description, Quantity, Price, Discount, DayOfWeek } = req.body;

  try {
    const special = await db.specials.create({
      SpecialName,
      Description,
      Quantity,
      Price,
      Discount,
      DayOfWeek
    });

    res.status(201).send({ message: "Special created successfully.", special });
  } catch (error) {
    res.status(500).send({ message: "Error creating special.", error: error.message });
  }
};
