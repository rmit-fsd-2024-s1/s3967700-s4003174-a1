module.exports = (express, app) => {
  const controller = require("../controllers/cart.controller.js");
  const router = express.Router();

  // Get user's cart (passing user ID as a parameter for simplicity)
  router.get("/:userID", controller.getCartItems);

  // Add item to cart (passing user ID as a parameter for simplicity)
  router.post('/add', controller.addToCart);

  // Update item in cart (passing user ID as a parameter for simplicity)
  router.put("/update/:userID", controller.updateCartItem);

  // Remove item from cart (passing user ID as a parameter for simplicity)
  router.delete("/remove/:userID", controller.removeCartItem);

  // Delete cart items
  router.delete("/deleteCart", controller.deleteCart);

  // Add specials to cart
  router.post('/addSpecial', controller.addSpecialToCart);

  // Add routes to server
  app.use('/api/cart', router);
};
