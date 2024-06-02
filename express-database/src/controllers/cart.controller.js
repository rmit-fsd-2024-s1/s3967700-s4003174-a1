const db = require("../database/index.js");

exports.getCart = async (req, res) => {
  const userID = req.params.userID;
  try {
    const cartItems = await db.cart.findAll({ where: { userID } });
    res.status(200).json(cartItems);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.addToCart = async (req, res) => {
    const userID = req.params.userID;
    const { itemID, quantity } = req.body;
  
    try {
      console.log('Received add to cart request:', { userID, itemID, quantity });
  
      // Find the existing cart item
      let cartItem = await db.cart.findOne({ where: { userID, itemID } });
      console.log('Found cart item:', cartItem);
  
      if (cartItem) {
        // Update the quantity if the item is already in the cart
        cartItem.quantity += quantity;
        await cartItem.save();
        console.log('Updated cart item:', cartItem);
      } else {
        // Add new item to the cart
        cartItem = await db.cart.create({ userID, itemID, quantity });
        console.log('Created new cart item:', cartItem);
      }
  
      res.status(200).json(cartItem);
    } catch (error) {
      console.error('Error adding to cart:', error);
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
