import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [userID, setUserID] = useState(null);

  useEffect(() => {
    // Fetch user information
    fetch('/api/users/current/1') // Assume current user ID is 1 for now
      .then(response => response.json())
      .then(data => {
        setUserID(data.UserID);
        fetch(`/api/cart/${data.UserID}`)
          .then(response => response.json())
          .then(data => setCartItems(data))
          .catch(error => console.error('Error fetching cart items:', error));
      })
      .catch(error => console.error('Error fetching user:', error));
  }, []);

  const handleRemoveItem = (itemID) => {
    fetch(`/api/cart/remove/${userID}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ itemID })
    })
    .then(response => response.json())
    .then(data => {
      setCartItems(cartItems.filter(item => item.itemID !== itemID));
    })
    .catch(error => console.error('Error removing item from cart:', error));
  };

  const handleQuantityChange = (itemID, quantity) => {
    const updatedItems = cartItems.map(item => {
      if (item.itemID === itemID) {
        item.quantity = Math.max(1, item.quantity + quantity);
      }
      return item;
    }).filter(item => item.quantity > 0); // Remove item if it reaches 0 quantity

    fetch(`/api/cart/update/${userID}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ itemID, quantity: updatedItems.find(item => item.itemID === itemID).quantity })
    })
    .then(response => response.json())
    .then(data => {
      setCartItems(updatedItems);
    })
    .catch(error => console.error('Error updating cart item:', error));
  };

  const calculateTotal = () => {
    return cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0).toFixed(2);
  };

  if (cartItems.length === 0) {
    return (
      <div>
        Your cart is empty.
        <div>
          <button onClick={() => navigate('/shop')} className="continue-shopping">
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1>Checkout</h1>
      <table>
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
            <tr key={item.itemID}>
              <td>{item.itemName}</td>
              <td>
                <button onClick={() => handleQuantityChange(item.itemID, -1)}>-</button>
                {item.quantity}
                <button onClick={() => handleQuantityChange(item.itemID, 1)}>+</button>
              </td>
              <td>${item.price.toFixed(2)}</td>
              <td>${(item.quantity * item.price).toFixed(2)}</td>
              <td><button onClick={() => handleRemoveItem(item.itemID)}>Remove</button></td>
            </tr>
          ))}
        </tbody>
      </table>
      <br/>
      <div>
        <h3>Total Cost: ${calculateTotal()}</h3>
      </div>
      <div>
        <button onClick={() => navigate('/payment')} className="continue-shopping">Proceed to Payment</button>
        <button onClick={() => navigate('/shop')} className="continue-shopping" style={{ marginLeft: '10px' }}>
          Continue Shopping
        </button>
      </div>
    </div>
  );
};

export default Checkout;
