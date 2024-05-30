module.exports = (express, app) => {
  const controller = require('../controller/review.controller.js');
  const router = express.Router();

  // Create a new review
  router.post("/", controller.createReview);

  // Update a review
  router.put("/", controller.updateReview);

  // Delete a review
  router.delete("/:ReviewID", controller.deleteReview);

  // Get reviews for a product
  router.get("/:ItemID", controller.getReviews);

  app.use("/api/reviews", router);
};