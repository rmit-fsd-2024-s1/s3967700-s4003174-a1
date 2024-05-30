const db = require("../database/index.js");
const Review = db.review;

exports.createReview = async (req, res) => {
  const { UserID, ItemID, ReviewTitle, Rating, ReviewText } = req.body;

  if (Rating < 1 || Rating > 5) {
    return res.status(400).send({ message: "Rating must be between 1 and 5." });
  }

  try {
    const review = await Review.create({
      UserID,
      ItemID,
      ReviewTitle,
      Rating,
      ReviewText
    });
    res.status(201).send(review);
  } catch (error) {
    res.status(500).send({ message: "Error creating review.", error: error.message });
  }
};

exports.updateReview = async (req, res) => {
  const { ReviewID, ReviewTitle, Rating, ReviewText } = req.body;

  if (Rating < 1 || Rating > 5) {
    return res.status(400).send({ message: "Rating must be between 1 and 5." });
  }

  try {
    const review = await Review.findByPk(ReviewID);
    if (!review) {
      return res.status(404).send({ message: "Review not found." });
    }

    review.ReviewTitle = ReviewTitle;
    review.Rating = Rating;
    review.ReviewText = ReviewText;
    await review.save();

    res.status(200).send(review);
  } catch (error) {
    res.status(500).send({ message: "Error updating review.", error: error.message });
  }
};

exports.deleteReview = async (req, res) => {
  const { ReviewID } = req.params;

  try {
    const review = await Review.findByPk(ReviewID);
    if (!review) {
      return res.status(404).send({ message: "Review not found." });
    }

    await review.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).send({ message: "Error deleting review.", error: error.message });
  }
};

exports.getReviews = async (req, res) => {
  const { ItemID } = req.params;

  try {
    const reviews = await Review.findAll({ where: { ItemID } });
    res.status(200).send(reviews);
  } catch (error) {
    res.status(500).send({ message: "Error fetching reviews.", error: error.message });
  }
};
