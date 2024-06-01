module.exports = (express, app) => {
    const controller = require("../controllers/orderItems.controller.js");
    const router = express.Router();
  
    // Get all order items for a specific order.
    router.get("/:orderID", controller.findOrderItems);
  
    // Add routes to server.
    app.use('/api/orderItems', router);
  };
  