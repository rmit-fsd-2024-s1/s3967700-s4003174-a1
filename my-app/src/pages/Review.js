import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./page.css";

const Review = ({ itemId, userId }) => {
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({ ReviewTitle: '', Rating: 1, ReviewText: '' });
  const [editingReview, setEditingReview] = useState(null);

  useEffect(() => {
    fetchReviews();
  }, [itemId]);

  const fetchReviews = async () => {
    try {
      const response = await axios.get(`/api/reviews/${itemId}`);
      setReviews(response.data);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewReview({ ...newReview, [name]: value });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditingReview({ ...editingReview, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/reviews', { ...newReview, UserID: userId, ItemID: itemId });
      setNewReview({ ReviewTitle: '', Rating: 1, ReviewText: '' });
      fetchReviews();
    } catch (error) {
      console.error('Error creating review:', error);
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put('/api/reviews', editingReview);
      setEditingReview(null);
      fetchReviews();
    } catch (error) {
      console.error('Error updating review:', error);
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
    <div className="review-container">
      <h2>Reviews</h2>
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
        <select
          name="Rating"
          value={newReview.Rating}
          onChange={handleChange}
          required
          className="review-select"
        >
          {[1, 2, 3, 4, 5].map((star) => (
            <option key={star} value={star}>
              {star}
            </option>
          ))}
        </select>
        <textarea
          name="ReviewText"
          value={newReview.ReviewText}
          onChange={handleChange}
          placeholder="Write your review"
          required
          className="review-textarea"
        />
        <button type="submit" className="review-button">Submit</button>
      </form>

      {reviews.map((review) => (
        <div key={review.ReviewID} className="review-item">
          {editingReview?.ReviewID === review.ReviewID ? (
            <form className="review-form" onSubmit={handleEditSubmit}>
              <input
                type="text"
                name="ReviewTitle"
                value={editingReview.ReviewTitle}
                onChange={handleEditChange}
                required
                className="review-input"
              />
              <select
                name="Rating"
                value={editingReview.Rating}
                onChange={handleEditChange}
                required
                className="review-select"
              >
                {[1, 2, 3, 4, 5].map((star) => (
                  <option key={star} value={star}>
                    {star}
                  </option>
                ))}
              </select>
              <textarea
                name="ReviewText"
                value={editingReview.ReviewText}
                onChange={handleEditChange}
                required
                className="review-textarea"
              />
              <button type="submit" className="review-button">Save</button>
              <button type="button" className="review-button cancel" onClick={() => setEditingReview(null)}>Cancel</button>
            </form>
          ) : (
            <div className="review-content">
              <h3>{review.ReviewTitle}</h3>
              <p>Rating: {review.Rating}</p>
              <p>{review.ReviewText}</p>
              {review.UserID === userId && (
                <div className="review-actions">
                  <button className="review-button" onClick={() => setEditingReview(review)}>Edit</button>
                  <button className="review-button delete" onClick={() => handleDelete(review.ReviewID)}>Delete</button>
                </div>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Review;

