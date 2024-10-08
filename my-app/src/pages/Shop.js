import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./page.css";

// Import images
import Advocado from './images/Advocado.jpg';
import Arugala from './images/arugula 100g.jpg';
import Cabbage from './images/Cabbage.jpg';
import Carrots from './images/Carrots.jpg';
import Chillies from './images/Chillies 100g.jpg';
import Cucumber from './images/Cucumber.jpg';
import Eggplant from './images/Eggplant.jpg';
import Garlic from './images/Garlic 100g.jpg';
import Kale from './images/Kale.jpg';
import Lettuce from './images/Lettuce 100g.jpg';
import Mangoes from './images/Mangoes.jpg';
import Mushrooms from './images/Mushrooms.jpg';
import Onions from './images/Onions 500g.jpg';
import Papaya from './images/Papaya.jpg';
import Pineapple from './images/Pineapple.jpg';
import Potatoes from './images/potatoes 1kg.jpg';
import Spinach from './images/spinach 100g.jpg';
import Tomatoes from './images/Tomatoes 500g.jpg';

const imageMap = {
  'Advocado': Advocado,
  'Arugala 100g': Arugala,
  'Cabbage': Cabbage,
  'Carrots': Carrots,
  'Chillies 100g': Chillies,
  'Cucumber': Cucumber,
  'Eggplant': Eggplant,
  'Garlic 100g': Garlic,
  'Kale': Kale,
  'Lettuce 100g': Lettuce,
  'Mangoes': Mangoes,
  'Mushrooms 150g': Mushrooms,
  'Onions 500g': Onions,
  'Papaya': Papaya,
  'Pineapple': Pineapple,
  'Potatoes 1kg': Potatoes,
  'Spinach 100g': Spinach,
  'Tomatoes 500g': Tomatoes,
};

const Shop = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [userID, setUserID] = useState(null);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/users/validate-session', {
          withCredentials: true
        });
        if (response.data && response.data.user) {
          setUserID(response.data.user.UserID);
        } else {
          throw new Error("Session data incomplete or missing.");
        }
      } catch (error) {
        console.error("Session validation error:", error);
        alert('Please log in to continue shopping.');
        navigate('/login');
      }
    };

    fetchCurrentUser();

    // Fetch items from the API
    axios.get('/api/items')
      .then(response => {
        setItems(response.data);
      })
      .catch(error => console.error('Error fetching items:', error));
  }, [navigate]);

  const handleQuantityChange = (itemName, value) => {
    setQuantities({
      ...quantities,
      [itemName]: Math.max(1, parseInt(value) || 1)
    });
  };

  const addToCart = (item) => {
    if (!userID) {
      alert('You must be logged in to add items to the cart.');
      navigate('/login');
      return;
    }
    const quantity = quantities[item.ItemName] || 1;
    axios.post('/api/cart/add', {
      userID: userID,
      itemID: item.ItemID,
      itemName: item.ItemName, // Include itemName in the request body
      price: item.Price, // Include price in the request body
      quantity: quantity
    })
    .then(response => {
      if (response.data.error) {
        alert(`Error: ${response.data.error}`);
      } else {
        alert(`${quantity} x ${item.ItemName} has been added to your cart.`);
      }
    })
    .catch(error => console.error('Error adding item to cart:', error));
  };

  const goToCheckout = () => {
    if (!userID) {
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
        {items.length > 0 ? items.map((item, index) => (
          <div className="col-lg-4" key={index} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div style={{ textAlign: "center" }}>
              <img src={imageMap[item.ItemName]} alt={item.ItemName} style={{ height: 200 }} />
              <h4 className="caption-shop">{item.ItemName} - ${item.Price !== undefined ? item.Price.toFixed(2) : 'N/A'}</h4>
              <input
                type="number"
                value={quantities[item.ItemName] || 1}
                onChange={(e) => handleQuantityChange(item.ItemName, e.target.value)}
                style={{ width: '50px', marginRight: '10px' }}
              />
              <button onClick={() => addToCart(item)} className="highlight-on-hover">Add to cart</button>
            </div>
          </div>
        )) : <div>Loading items...</div>}
      </div>
      <div style={{ marginTop: '20px'}}>
        <button onClick={goToCheckout} className="btn checkout-button">Go to Checkout</button>
      </div>
    </div>
  );
};

export default Shop;
