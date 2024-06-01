const db = require("../database/index.js");

exports.findOrderItems = async (req, res) => {
  try {
    const orderItems = await db.OrderItem.findAll({ where: { orderID: req.params.orderID } });
    res.status(200).json(orderItems);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
