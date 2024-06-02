import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const Summary = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [userID, setUserID] = useState(null); // Store the user ID

  const fetchCurrentUser = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/users/validate-session', { withCredentials: true });
      if (response.data && response.data.user) {
        setUserID(response.data.user.UserID);
        return response.data.user.UserID;
      } else {
        throw new Error("Session data incomplete or missing.");
      }
    } catch (error) {
      console.log("Session validation error:", error);
      alert('Please log in to view profile.');
      navigate('/login');
      return null;
    }
  };

  const fetchCartItems = async (userID) => {
    try {
      const response = await axios.get(`/api/cart/${userID}`);
      setCartItems(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching cart items:', error);
      setError(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    const initialize = async () => {
      const userId = await fetchCurrentUser();
      if (userId) {
        await fetchCartItems(userId);
      }
    };

    initialize();
  }, []);

  useEffect(() => {
    const handleBeforeUnload = async () => {
      await deleteCartItems();
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      handleBeforeUnload();
    };
  }, [userID]); // Depend on userID to ensure it's available

  const deleteCartItems = async () => {
    if (!userID) return; // Ensure userID is available
    try {
      await fetch(`/api/cart/deleteCart?userID=${userID}`, { method: 'DELETE' });
      console.log('Cart items deleted');
    } catch (error) {
      console.error('Failed to delete cart items:', error);
    }
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
      <button onClick={() => navigate('/shop')} className="continue-shopping">
        Continue Shopping
      </button>
    </div>
  );
};

export default Summary;