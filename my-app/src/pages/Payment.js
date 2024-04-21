import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Functions to handle local storage for the cart
const getCartItems = () => {
  const cart = localStorage.getItem('cart');
  return cart ? JSON.parse(cart) : [];
};

const saveLastPurchase = (cartItems) => {
  localStorage.setItem('lastPurchase', JSON.stringify(cartItems));
};

const clearCart = () => {
  const cartItems = getCartItems();
  saveLastPurchase(cartItems); // Save before clearing
  localStorage.removeItem('cart');
};

const Payment = () => {
  const [creditCard, setCreditCard] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const validateCreditCard = (number) => {
    return /^\d{16}$/.test(number);
  };

  const validateExpiryDate = (date) => {
    // make sure date is not expired or invalid
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

  const handleSubmit = (e) => {
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
    clearCart();
    navigate('/summary'); // Redirects to the summary page
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
        <button onClick={() => navigate('/payment')} className="continue-shopping" style={{ marginLeft: '10px' }}>Back to cart</button>
        {error && <div style={{ color: 'red' }}>{error}</div>}
      </form>
    </div>
  );
};

export default Payment;
