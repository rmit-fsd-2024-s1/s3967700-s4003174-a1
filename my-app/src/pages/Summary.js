import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation

const Summary = () => {
  const navigate = useNavigate(); // Hook for navigating programmatically
  const lastPurchase = JSON.parse(localStorage.getItem('lastPurchase'));

  // Calculate the total cost of the last purchase
  const calculateTotal = () => {
    return lastPurchase.reduce((total, item) => total + item.quantity * item.price, 0).toFixed(2);
  };

  if (!lastPurchase || lastPurchase.length === 0) {
    return <div>No recent purchases found.</div>;
  }

  return (
    <div>
      <h1>Purchase Summary</h1>
      <div>
        {lastPurchase.map((item, index) => (
          <div key={index}>
            <h3>{item.itemName}</h3>
            <p>Quantity: {item.quantity}</p>
            <p>Price per item: ${item.price.toFixed(2)}</p>
            <p>Total: ${(item.quantity * item.price).toFixed(2)}</p>
          </div>
        ))}
        <div className="total-cost">
          <h3>Total Cost: ${calculateTotal()}</h3>
        </div>
      </div>
      <br/>
      <h4>Thank you for shopping at SOIL</h4>
      <button onClick={() => navigate('/shop')} className="continue-shopping">
        Continue Shopping
      </button>
    </div>
  );
};

export default Summary;

