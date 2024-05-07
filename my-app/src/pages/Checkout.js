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
    }).filter(item => item.quantity > 0); // Remove item if it reaches 0 quantity
    setCartItems(updatedItems);
    localStorage.setItem('cart', JSON.stringify(updatedItems));
  };

  const calculateTotal = () => {
    return cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0).toFixed(2); // find total cost... make it to two decimal places
  };

  if (cartItems.length === 0) {
    return <div>Your cart is empty.
        <div><button onClick={() => navigate('/shop')} className="continue-shopping">Continue Shopping</button></div>
    </div>;
  }

  return (
    <div>
      <h1>Checkout</h1>
      <table>
        {/* display items in cart in a table format */}
        <thead>
          <tr>
            <th>Item Name</th>
            <th>Quantity</th>
            <th>Price Per Item</th>
            <th>Total Price</th>
            <th>Remove Item</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map(item => (
            <tr key={item.itemName}>
              <td>{item.itemName}</td>
              <td>
                <button onClick={() => handleQuantityChange(item.itemName, -1)}>-</button>
                {item.quantity}
                <button onClick={() => handleQuantityChange(item.itemName, 1)}>+</button>
              </td>
              <td>${item.price.toFixed(2)}</td>
              <td>${(item.quantity * item.price).toFixed(2)}</td>
              <td><button onClick={() => handleRemoveItem(item.itemName)}>Remove</button></td>
            </tr>
          ))}
        </tbody>
      </table>
      <br/>
      <div><h3>Total Cost: ${calculateTotal()}</h3></div>
      <div>
        <button onClick={() => navigate('/payment')} className="continue-shopping">Proceed to Payment</button>
        <button onClick={() => navigate('/shop')} className="continue-shopping" style={{ marginLeft: '10px' }}>Continue Shopping</button>
      </div>
    </div>
  );
};

export default Checkout;


