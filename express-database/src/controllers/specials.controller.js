const db = require("../database/index.js");

exports.findAll = async (req, res) => {
  try {
    const specials = await db.Specials.findAll();
    res.status(200).json(specials);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
