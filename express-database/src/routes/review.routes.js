module.exports = (express, app) => {
  const reviews = require("../controllers/review.controller.js");
  const router = express.Router();

  // Create a new review
  router.post("/", reviews.createReview);

  // Update a review
  router.put("/", reviews.updateReview);

  // Delete a review
  router.delete("/:ReviewID", reviews.deleteReview);

  // Get reviews for a product
  router.get("/:ItemID", reviews.getReviews);

  app.use("/api/reviews", router);
};
