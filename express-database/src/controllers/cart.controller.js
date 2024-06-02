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
  const { userID, itemName, price, quantity } = req.body;

  try {
    // Check if the item exists in the database
    const item = await db.item.findOne({ where: { ItemName: itemName } });
    if (!item) {
      return res.status(404).json({ error: 'Item not found' });
    }

    // Check if the item is already in the user's cart
    const cartItem = await db.cart.findOne({ where: { userID, itemID: item.ItemID } });

    if (cartItem) {
      // If the item is already in the cart, update the quantity
      cartItem.quantity += quantity;
      await cartItem.save();
    } else {
      // If the item is not in the cart, add it
      await db.cart.create({
        userID,
        itemID: item.ItemID,
        itemName: itemName,
        price: price,
        quantity: quantity
      });
    }

    res.status(200).json({ message: 'Item added to cart' });
  } catch (error) {
    console.error('Error adding item to cart:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.addSpecialToCart = async (req, res) => {
  const { userID, itemName, price, quantity } = req.body;

  try {
    // Check if the special item exists in the database
    const special = await db.special.findOne({ where: { SpecialName: itemName } });
    if (!special) {
      return res.status(404).json({ error: 'Special item not found' });
    }

    // Check if the special item is already in the user's cart
    const cartItem = await db.cart.findOne({ where: { userID, specialID: special.specialID } });

    if (cartItem) {
      // If the item is already in the cart, update the quantity
      cartItem.quantity += quantity;
      await cartItem.save();
    } else {
      // If the item is not in the cart, add it
      await db.cart.create({
        userID,
        specialID: special.specialID,
        itemName: itemName,
        price: price,
        quantity: quantity
      });
    }

    res.status(200).json({ message: 'Special item added to cart' });
  } catch (error) {
    console.error('Error adding special item to cart:', error);
    res.status(500).json({ error: 'Internal server error' });
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

