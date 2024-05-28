const db = require('../models');

// Create a new item
exports.create = async (req, res) => {
  try {
    const newItem = await db.item.create({
      itemName: req.body.itemName,
      price: req.body.price
    });
    res.status(201).json(newItem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all items
exports.findAll = async (req, res) => {
  try {
    const items = await db.item.findAll();
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};