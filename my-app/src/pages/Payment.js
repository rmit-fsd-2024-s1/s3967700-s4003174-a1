import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Payment = () => {
  const [creditCard, setCreditCard] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [error, setError] = useState('');
  const [userID, setUserID] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/users/validate-session', {
          withCredentials: true
        });
        if (response.data && response.data.user) {
          console.log('Current user:', response.data.user);
          setUserID(response.data.user.UserID);
          return response.data.user.UserID;
        } else {
          throw new Error("Session data incomplete or missing.");
        }
      } catch (error) {
        console.log("Session validation error:", error);
        alert('Please log in to proceed.');
        navigate('/login');
      }
    };

    const fetchCartItems = async (userID) => {
      try {
        const response = await fetch(`/api/cart/${userID}`);
        if (!response.ok) {
          throw new Error('Failed to fetch cart items');
        }
        const data = await response.json();
        console.log('Fetched cart items:', data);
        setCartItems(data);
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    };

    fetchProfile().then(userID => {
      if (userID) {
        fetchCartItems(userID);
      }
    });
  }, [navigate]);

  const validateCreditCard = (number) => {
    return /^\d{16}$/.test(number);
  };

  const validateExpiryDate = (date) => {
    const regex = /^(0[1-9]|1[0-2])\/\d{2}$/;
    if (!regex.test(date)) return false;
    const [month, year] = date.split('/').map(Number);
    const expiry = new Date(`20${year}`, month - 1);
    return expiry > new Date();
  };

  const handleCreditCardInput = (e) => {
    const value = e.target.value;
    if (value.length <= 16 && /^\d*$/.test(value)) {
      setCreditCard(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!validateCreditCard(creditCard)) {
      setError('Invalid credit card number. It should be a 16-digit number.');
      return;
    }
    if (!validateExpiryDate(expiryDate)) {
      setError('Invalid expiry date. Date format should be MM/YY and should not be expired.');
      return;
    }

    if (cartItems.length === 0) {
      setError('No items in the cart.');
      return;
    }

    const firstCartItem = cartItems[0];
    if (!firstCartItem.cartID) {
      setError('cartID is missing in the cart items.');
      return;
    }

    const amount = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

    try {
      console.log('Processing payment...');
      const response = await fetch('/api/payment/process', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cartID: firstCartItem.cartID, userID, amount }),
      });
      const data = await response.json();
      console.log('Payment response:', data);
      if (response.ok) {
        navigate('/summary');
      } else {
        setError(data.error);
      }
    } catch (error) {
      console.error('Error processing payment:', error);
      setError('Error processing payment. Please try again.');
    }
  };

  return (
    <div>
      <h1>Payment</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="creditCard">Credit Card Number:</label>
          <input
            type="text"
            id="creditCard"
            value={creditCard}
            onChange={handleCreditCardInput}
            placeholder="Enter 16-digit card number"
          />
        </div>
        <div>
          <label htmlFor="expiryDate">Expiry Date (MM/YY):</label>
          <input
            type="text"
            id="expiryDate"
            value={expiryDate}
            onChange={(e) => setExpiryDate(e.target.value)}
            placeholder="MM/YY"
          />
        </div>
        <button type="submit" className="continue-shopping">Complete Purchase</button>
        <button onClick={() => navigate('/cart')} className="continue-shopping" style={{ marginLeft: '10px' }}>Back to cart</button>
        {error && <div style={{ color: 'red' }}>{error}</div>}
      </form>
    </div>
  );
};

export default Payment;
