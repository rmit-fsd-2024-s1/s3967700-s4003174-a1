const db = require("../database/index.js");

exports.createOrder = async (req, res) => {
  const { userID, items } = req.body;
  try {
    const order = await db.Order.create({ userID, totalAmount: 0 });
    let totalAmount = 0;
    for (const item of items) {
      const itemDetails = await db.Item.findByPk(item.itemID);
      if (itemDetails) {
        await db.OrderItem.create({
          orderID: order.OrderID,
          itemID: item.itemID,
          quantity: item.quantity,
        });
        totalAmount += itemDetails.Price * item.quantity;
      }
    }
    order.totalAmount = totalAmount;
    await order.save();
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
