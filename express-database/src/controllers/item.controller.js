const db = require("../database/index.js");

exports.findAll = async (req, res) => {
  try {
    console.log("Fetching items...");
    const items = await db.item.findAll();
    console.log("Items fetched:", items);
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.create = async (req, res) => {
  try {
    const newItem = await db.item.create(req.body);
    res.status(201).json(newItem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
