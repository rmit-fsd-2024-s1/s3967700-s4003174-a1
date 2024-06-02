module.exports = (express, app) => {
  const controller = require("../controllers/payment.controller.js");
  const router = express.Router();

  // Process a new payment
  router.post("/process", controller.processPayment);

  // Get last purchase details
  router.get("/lastPurchase", controller.getLastPurchase);

  // Add routes to server
  app.use('/api/payment', router);
};
