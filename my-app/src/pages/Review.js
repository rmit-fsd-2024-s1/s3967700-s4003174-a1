import React, { useState } from 'react';
import ReviewForm from './ReviewForm';
import ReviewList from './ReviewList.js';
import './page.css';

const Review = ({ itemId, userId }) => {
  const [view, setView] = useState('none');

  const handleViewChange = (newView) => {
    setView(newView);
  };

  return (
    <div className="review-container">
      <h2>Reviews</h2>
      {view === 'none' && (
        <div className="review-options">
          <button onClick={() => handleViewChange('create')} className="review-button">Create a Review</button>
          <button onClick={() => handleViewChange('view')} className="review-button">View All Reviews</button>
        </div>
      )}
      {view === 'create' && <ReviewForm itemId={itemId} userId={userId} onBack={() => handleViewChange('none')} />}
      {view === 'view' && <ReviewList itemId={itemId} userId={userId} onBack={() => handleViewChange('none')} />}
    </div>
  );
};

export default Review;