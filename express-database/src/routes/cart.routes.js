module.exports = (express, app) => {
  const controller = require("../controllers/cart.controller.js");
  const router = express.Router();

  // Get user's cart (passing user ID as a parameter for simplicity)
  router.get("/:userID", controller.getCart);

  // Add item to cart (passing user ID as a parameter for simplicity)
  router.post("/add/:userID", controller.addToCart);

  // Update item in cart (passing user ID as a parameter for simplicity)
  router.put("/update/:userID", controller.updateCart);

  // Remove item from cart (passing user ID as a parameter for simplicity)
  router.delete("/remove/:userID", controller.removeFromCart);

  // Add routes to server
  app.use('/api/cart', router);
};
