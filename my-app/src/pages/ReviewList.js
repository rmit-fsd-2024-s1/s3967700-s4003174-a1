import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Rating from 'react-rating-stars-component';
import './page.css';

const ReviewList = ({ itemId, userId, onBack }) => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const response = await axios.get('/api/reviews'); // Adjust the endpoint if needed
      setReviews(response.data);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  };

  const handleDelete = async (reviewID) => {
    try {
      await axios.delete(`/api/reviews/${reviewID}`);
      fetchReviews();
    } catch (error) {
      console.error('Error deleting review:', error);
    }
  };

  return (
    <div className="review-list-container">
      <h2>All Reviews</h2>
      <button type="button" className="review-button" onClick={onBack}>Back</button>
      {reviews.map((review) => (
        <div key={review.ReviewID} className="review-item">
          <div className="review-content">
            <h3>{review.ReviewTitle}</h3>
            <Rating
              count={5}
              value={review.Rating}
              size={24}
              edit={false}
              activeColor="#ffd700"
            />
            <p>{review.ReviewText}</p>
            {review.UserID === userId && (
              <div className="review-actions">
                <button className="review-button" onClick={() => setEditingReview(review)}>Edit</button>
                <button className="review-button delete" onClick={() => handleDelete(review.ReviewID)}>Delete</button>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ReviewList;
