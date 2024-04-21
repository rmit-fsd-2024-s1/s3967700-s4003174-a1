import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import Advocado from './images/Advocado.jpg';
import Cabbage from './images/Cabbage.jpg';
import Carrot from './images/Carrot.jpg';
import Chillies from './images/Chillies.jpg';
import Cucumber from './images/Cucumber.jpg';
import Eggplant from './images/Eggplant.jpg';
import Garlic from './images/Garlic.jpg';
import Kale from './images/Kale.jpg';
import Lettuce from './images/Lettuce.jpg';
import Mushrooms from './images/Mushrooms.jpg';
import Onions from './images/Onions.jpg';
import Tomatoes from './images/Tomatoes.jpg';
import "./page.css";

const Shop = () => {
  const navigate = useNavigate();
  const [quantities, setQuantities] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if the user data exists in local storage to determine logged in status
    const user = localStorage.getItem('user');
    setIsLoggedIn(!!user);
  }, []);

  const items = [
    { itemName: 'Advocado', itemLink: Advocado, price: 5.35 },
    { itemName: 'Cabbage', itemLink: Cabbage, price: 8.21 },
    { itemName: 'Carrots', itemLink: Carrot, price: 4.55 },
    { itemName: 'Chillies 100g', itemLink: Chillies, price: 5.29 },
    { itemName: 'Cucumber', itemLink: Cucumber, price: 5.99 },
    { itemName: 'Eggplant', itemLink: Eggplant, price: 5.95 },
    { itemName: 'Garlic 100g', itemLink: Garlic, price: 8.92 },
    { itemName: 'Kale', itemLink: Kale, price: 5.47 },
    { itemName: 'Lettuce', itemLink: Lettuce, price: 5.99 },
    { itemName: 'Mushrooms 150g', itemLink: Mushrooms, price: 7.79 },
    { itemName: 'Onions', itemLink: Onions, price: 4.97 },
    { itemName: 'Tomatoes 500g', itemLink: Tomatoes, price: 9.79 },
  ];

  const handleQuantityChange = (itemName, value) => {
    setQuantities({
      ...quantities,
      [itemName]: Math.max(1, parseInt(value) || 1) // can not add negative items
    });
  };

  const addToCart = (item) => {
    if (!isLoggedIn) {
      alert('You must be logged in to add items to the cart.');
      navigate('/login');
      return;
    }
    const quantity = quantities[item.itemName] || 1;
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    const existingItem = cartItems.find(i => i.itemName === item.itemName);
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cartItems.push({ ...item, quantity });
    }
    localStorage.setItem('cart', JSON.stringify(cartItems));
    alert(`${quantity} x ${item.itemName} has been added to your cart.`);
  };

  const goToCheckout = () => {
    if (!isLoggedIn) {
      alert('Please log in to proceed to checkout.');
      navigate('/login');
      return;
    }
    navigate('/checkout');
  };

  return (
    <div className="main">
      <div className="text-center">
        <h2>All ingredients are grown locally and organic</h2>
      </div>
      <div className="row">
        {items.map((item, index) => (
          <div className="col-lg-4" key={index} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div style={{ textAlign: "center" }}>
              <img src={item.itemLink} alt={item.itemName} style={{ height: 200 }} />
              <h4 className="caption-shop">{item.itemName} - ${item.price.toFixed(2)}</h4>
              <input
                type="number"
                value={quantities[item.itemName] || 1}
                onChange={(e) => handleQuantityChange(item.itemName, e.target.value)}
                style={{ width: '50px', marginRight: '10px' }}
              />
              <button onClick={() => addToCart(item)} className="highlight-on-hover">Add to cart</button>
            </div>
          </div>
        ))}
      </div>
      <div className="text-center" style={{ marginTop: '20px' }}>
        <button onClick={goToCheckout} className="btn btn-primary">Go to Checkout</button>
      </div>
    </div>
  );
};

export default Shop;





