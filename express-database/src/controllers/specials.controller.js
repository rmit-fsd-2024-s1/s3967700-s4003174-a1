const db = require("../database/index.js");

exports.findAll = async (req, res) => {
  try {
    console.log('Fetching all specials from database');
    const specials = await db.specials.findAll();
    console.log('Specials fetched:', specials);
    res.status(200).json(specials);
  } catch (error) {
    console.error('Error fetching specials:', error);
    res.status(500).json({ error: error.message });
  }
};