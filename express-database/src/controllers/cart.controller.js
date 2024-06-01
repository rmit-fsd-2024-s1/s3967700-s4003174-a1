const db = require("../database/index.js");

exports.getCart = async (req, res) => {
  const userId = req.user.id;
  try {
    const cartItems = await db.Cart.findAll({ where: { userID: userId } });
    res.status(200).json(cartItems);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.addToCart = async (req, res) => {
  const userId = req.user.id;
  const { itemID, quantity } = req.body;
  try {
    const cartItem = await db.Cart.findOne({ where: { userID: userId, itemID: itemID } });
    if (cartItem) {
      cartItem.quantity += quantity;
      await cartItem.save();
    } else {
      await db.Cart.create({ userID: userId, itemID, quantity });
    }
    res.status(201).json({ message: 'Item added to cart' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateCart = async (req, res) => {
  const userId = req.user.id;
  const { itemID, quantity } = req.body;
  try {
    const cartItem = await db.Cart.findOne({ where: { userID: userId, itemID: itemID } });
    if (cartItem) {
      cartItem.quantity = quantity;
      await cartItem.save();
      res.status(200).json({ message: 'Cart updated' });
    } else {
      res.status(404).json({ message: 'Item not found in cart' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.removeFromCart = async (req, res) => {
  const userId = req.user.id;
  const { itemID } = req.body;
  try {
    const cartItem = await db.Cart.findOne({ where: { userID: userId, itemID: itemID } });
    if (cartItem) {
      await cartItem.destroy();
      res.status(200).json({ message: 'Item removed from cart' });
    } else {
      res.status(404).json({ message: 'Item not found in cart' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
