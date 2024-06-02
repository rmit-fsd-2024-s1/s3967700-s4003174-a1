import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Summary = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const userID = 1; // Replace with the actual user ID as needed
    const fetchCartItems = async () => {
      try {
        const response = await fetch(`/api/cart/getCart?userID=${userID}`);
        if (!response.ok) {
          throw new Error('Failed to fetch cart items');
        }
        const data = await response.json();
        setCartItems(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchCartItems();
  }, []);

  const deleteCartItems = async () => {
    const userID = 1; // Replace with the actual user ID as needed
    try {
      await fetch(`/api/cart/deleteCart?userID=${userID}`, { method: 'DELETE' });
    } catch (error) {
      console.error('Failed to delete cart items:', error);
    }
  };

  const handleContinueShopping = () => {
    deleteCartItems();
    navigate('/shop');
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.quantity * item.price, 0).toFixed(2);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!cartItems || cartItems.length === 0) {
    return <div>No items in cart.</div>;
  }

  return (
    <div>
      <h1>Purchase Summary</h1>
      <div>
        {cartItems.map((item, index) => (
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
      <button onClick={handleContinueShopping} className="continue-shopping">
        Continue Shopping
      </button>
    </div>
  );
};

export default Summary;
