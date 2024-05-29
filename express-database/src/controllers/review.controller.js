const db = require("../database/index"); // Corrected path

exports.findAll = async (req, res) => {
  try {
    const reviews = await db.Review.findAll();
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};