const db = require("../database/index.js");
const Cart = db.cart;

exports.getCartItems = async (req, res) => {
  const userID = req.params.userID;
  try {
    const cartItems = await Cart.findAll({
      where: { userID },
      raw: true
    });

    console.log('Fetched cart items:', cartItems); // Log fetched cart items to debug
    res.status(200).json(cartItems);
  } catch (error) {
    console.error('Error fetching cart items:', error);
    res.status(500).json({ error: error.message });
  }
};

exports.addToCart = async (req, res) => {
  const { userID, itemID, itemName, price, quantity } = req.body;
  try {
    const existingCartItem = await Cart.findOne({ where: { userID, itemID } });

    if (existingCartItem) {
      existingCartItem.quantity += quantity;
      await existingCartItem.save();
    } else {
      await Cart.create({ userID, itemID, itemName, price, quantity });
    }

    res.status(200).json({ message: 'Item added to cart' });
  } catch (error) {
    console.error('Error adding to cart:', error);
    res.status(500).json({ error: error.message });
  }
};

exports.updateCartItem = async (req, res) => {
  const { userID } = req.params;
  const { itemID, quantity } = req.body;

  try {
    const cartItem = await Cart.findOne({ where: { userID, itemID } });

    if (cartItem) {
      cartItem.quantity = quantity;
      await cartItem.save();
      res.status(200).json(cartItem);
    } else {
      res.status(404).json({ message: 'Item not found in cart' });
    }
  } catch (error) {
    console.error('Error updating cart item:', error);
    res.status(500).json({ error: error.message });
  }
};

exports.removeCartItem = async (req, res) => {
  const { userID } = req.params;
  const { itemID } = req.body;

  try {
    const result = await Cart.destroy({ where: { userID, itemID } });

    if (result) {
      res.status(200).json({ message: 'Item removed from cart' });
    } else {
      res.status(404).json({ message: 'Item not found in cart' });
    }
  } catch (error) {
    console.error('Error removing cart item:', error);
    res.status(500).json({ error: error.message });
  }
};

exports.deleteCart = async (req, res) => {
  const userID = req.query.userID;

  try {
    await Cart.destroy({
      where: { userID }
    });

    res.status(200).json({ message: 'Cart deleted successfully' });
  } catch (error) {
    console.error('Error deleting cart:', error);
    res.status(500).json({ error: 'Failed to delete cart' });
  }
};

