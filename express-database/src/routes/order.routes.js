module.exports = (express, app) => {
    const controller = require("../controllers/order.controller.js");
    const router = express.Router();
  
    // Create a new order.
    router.post("/", controller.createOrder);
  
    // Add routes to server.
    app.use('/api/orders', router);
  };
  