import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Payment = () => {
  const [creditCard, setCreditCard] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [error, setError] = useState('');
  const [userID, setUserID] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch user information
    fetch('/api/users/current')
      .then(response => response.json())
      .then(data => {
        setUserID(data.UserID);
        return fetch(`/api/cart/${data.UserID}`);
      })
      .then(response => response.json())
      .then(data => {
        setCartItems(data);
      })
      .catch(error => console.error('Error fetching user or cart items:', error));
  }, []);

  const validateCreditCard = (number) => {
    return /^\d{16}$/.test(number);
  };

  const validateExpiryDate = (date) => {
    // Make sure date is not expired or invalid
    const regex = /^(0[1-9]|1[0-2])\/\d{2}$/;
    if (!regex.test(date)) return false;
    const [month, year] = date.split('/').map(Number);
    const expiry = new Date(`20${year}`, month - 1);
    return expiry > new Date();
  };

  const handleCreditCardInput = (e) => {
    const value = e.target.value;
    // Limit input to only digits and max 16 digits
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

    const amount = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

    try {
      const response = await fetch('/api/payment/process', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cartID: cartItems[0].cartID, userID, amount }), // Assuming cartID from the first item; adjust as necessary
      });
      const data = await response.json();
      if (response.ok) {
        navigate('/summary');
      } else {
        setError(data.error);
      }
    } catch (error) {
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