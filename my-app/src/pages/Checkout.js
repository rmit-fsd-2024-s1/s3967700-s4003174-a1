import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(items);
  }, []);

  const handleRemoveItem = (itemName) => {
    const updatedItems = cartItems.filter(item => item.itemName !== itemName);
    setCartItems(updatedItems);
    localStorage.setItem('cart', JSON.stringify(updatedItems));
  };

  const handleQuantityChange = (itemName, quantity) => {
    const updatedItems = cartItems.map(item => {
      if (item.itemName === itemName) {
        return { ...item, quantity: Math.max(0, item.quantity + quantity) };
      }
      return item;
    }).filter(item => item.quantity > 0); // Remove items with zero quantity
    setCartItems(updatedItems);
    localStorage.setItem('cart', JSON.stringify(updatedItems));
  };

  const calculateTotal = () => {
    return cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0).toFixed(2);
  };

  if (cartItems.length === 0) {
    return <div>Your cart is empty.</div>;
  }

  return (
    <div>
      <h1>Checkout</h1>
      <ul>
        {cartItems.map(item => (
          <li key={item.itemName}>
            {item.itemName} - Quantity: {item.quantity} 
            - Price per item: ${item.price.toFixed(2)} 
            - Total: ${(item.quantity * item.price).toFixed(2)}
            <button onClick={() => handleQuantityChange(item.itemName, -1)}>-</button>
            <button onClick={() => handleQuantityChange(item.itemName, 1)}>+</button>
            <button onClick={() => handleRemoveItem(item.itemName)}>Remove</button>
          </li>
        ))}
      </ul>
      <div>Total: ${calculateTotal()}</div>
      <button onClick={() => navigate('/payment')}>Proceed to Payment</button>
    </div>
  );
};

export default Checkout;

