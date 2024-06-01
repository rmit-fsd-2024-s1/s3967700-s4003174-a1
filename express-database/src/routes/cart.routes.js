module.exports = (express, app) => {
    const controller = require("../controllers/cart.controller.js");
    const router = express.Router();
  
    // Get user's cart.
    router.get("/", controller.getCart);
  
    // Add item to cart.
    router.post("/add", controller.addToCart);
  
    // Update item in cart.
    router.put("/update", controller.updateCart);
  
    // Remove item from cart.
    router.delete("/remove", controller.removeFromCart);
  
    // Add routes to server.
    app.use('/api/cart', router);
  };
  