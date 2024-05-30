import React, { useState } from 'react';
import axios from 'axios';
import Rating from 'react-rating-stars-component';
import './page.css';

const ReviewForm = ({ itemId, userId, onBack }) => {
  const [newReview, setNewReview] = useState({ ReviewTitle: '', Rating: 1, ReviewText: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewReview({ ...newReview, [name]: value });
  };

  const handleRatingChange = (newRating) => {
    setNewReview({ ...newReview, Rating: newRating });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/reviews', { ...newReview, UserID: userId, ItemID: itemId });
      setNewReview({ ReviewTitle: '', Rating: 1, ReviewText: '' });
      onBack();
    } catch (error) {
      console.error('Error creating review:', error);
    }
  };

  return (
    <div className="review-form-container">
      <h2>Create a Review</h2>
      <form className="review-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="ReviewTitle"
          value={newReview.ReviewTitle}
          onChange={handleChange}
          placeholder="Title"
          required
          className="review-input"
        />
        <label>Rating:</label>
        <Rating
          count={5}
          value={newReview.Rating}
          onChange={handleRatingChange}
          size={24}
          activeColor="#ffd700"
        />
        <textarea
          name="ReviewText"
          value={newReview.ReviewText}
          onChange={handleChange}
          placeholder="Write your review"
          required
          className="review-textarea"
        />
        <button type="submit" className="review-button">Submit</button>
        <button type="button" className="review-button cancel" onClick={onBack}>Back</button>
      </form>
    </div>
  );
};

export default ReviewForm;
