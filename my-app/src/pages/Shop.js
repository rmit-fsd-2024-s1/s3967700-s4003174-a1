import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import Advocado from './images/Advocado.jpg';
import Arugala from './images/arugula.jpg';
import Cabbage from './images/Cabbage.jpg';
import Carrot from './images/Carrot.jpg';
import Chillies from './images/Chillies.jpg';
import Cucumber from './images/Cucumber.jpg';
import Eggplant from './images/Eggplant.jpg';
import Garlic from './images/Garlic.jpg';
import Kale from './images/Kale.jpg';
import Lettuce from './images/Lettuce.jpg';
import Mango from './images/Mangoes.jpg'
import Mushrooms from './images/Mushrooms.jpg';
import Onions from './images/Onions.jpg';
import Papaya from './images/Papaya.jpg';
import Pineapple from './images/Pineapple.jpg';
import Potato from './images/potato.jpg';
import Spinach from './images/spinach.jpg';
import Tomatoes from './images/Tomatoes.jpg';
import "./page.css";

const Shop = () => {
  const navigate = useNavigate();
  const [quantities, setQuantities] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if the user data exists in local storage
    const user = localStorage.getItem('currentUser');
    setIsLoggedIn(!!user);
  }, []);

  const items = [
    { itemName: 'Advocado', itemLink: Advocado, price: 5.35 },
    { itemName: 'Arugala 100g', itemLink: Arugala, price: 5.20},
    { itemName: 'Cabbage', itemLink: Cabbage, price: 8.21 },
    { itemName: 'Carrots', itemLink: Carrot, price: 4.55 },
    { itemName: 'Chillies 100g', itemLink: Chillies, price: 5.29 },
    { itemName: 'Cucumber', itemLink: Cucumber, price: 5.99 },
    { itemName: 'Eggplant', itemLink: Eggplant, price: 5.95 },
    { itemName: 'Garlic 100g', itemLink: Garlic, price: 8.92 },
    { itemName: 'Kale', itemLink: Kale, price: 5.47 },
    { itemName: 'Lettuce 100g', itemLink: Lettuce, price: 5.99 },
    { itemName: 'Mangoes', itemLink: Mango, price: 5.99 },
    { itemName: 'Mushrooms 150g', itemLink: Mushrooms, price: 7.79 },
    { itemName: 'Onions 500g', itemLink: Onions, price: 3.60 },
    { itemName: 'Papaya', itemLink: Papaya, price: 4.60},
    { itemName: 'Pineapple', itemLink: Pineapple, price: 7.69},
    { itemName: 'Potatoes 1kg', itemLink: Potato, price: 7.49},
    { itemName: 'Spinach 100g', itemLink: Spinach, price: 4.09},
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
      <div style={{ marginTop: '20px'}}>
        <button onClick={goToCheckout} className="btn checkout-button">Go to Checkout</button>
      </div>
    </div>
  );
};

export default Shop;





