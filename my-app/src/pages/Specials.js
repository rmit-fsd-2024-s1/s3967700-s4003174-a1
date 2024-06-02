import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Mondays from './images/Mondays.jpg';
import Tuesdays from './images/Tuesdays.jpg';
import Wednesdays from './images/Wednesdays.jpg';
import Thursdays from './images/Thursdays.jpg';
import Fridays from './images/Fridays.jpg';
import Saturdays from './images/Saturdays.jpg';
import Sundays from './images/Sundays.jpg';
import food from './images/organic.jpg';
import review from './images/review.jpg';
import "./page.css";
import { Link } from "react-router-dom";

const images = {
  "Monday": Mondays,
  "Tuesday": Tuesdays,
  "Wednesday": Wednesdays,
  "Thursday": Thursdays,
  "Friday": Fridays,
  "Saturday": Saturdays,
  "Sunday": Sundays
};

function Specials() {
  const navigate = useNavigate();
  const [todaySpecial, setTodaySpecial] = useState(null);
  const [userID, setUserID] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
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
        console.log("Session validation error:", error);
        alert('Please log in to view specials.');
        navigate('/login');
      }
    };

    fetchProfile();

    const currentDay = new Date().toLocaleString('en-US', { weekday: 'long' });

    // Fetch today's special from the database
    fetch(`/api/specials`)
      .then(response => response.json())
      .then(data => {
        const specialData = data.find(special => special.DayOfWeek === currentDay);
        if (specialData) {
          setTodaySpecial({
            ...specialData,
            imageSrc: images[currentDay],
            quantity: 1 // Reset quantity every time the day changes
          });
        }
      })
      .catch(error => console.error('Error fetching specials:', error));
  }, [navigate]);

  const addToCart = async () => {
    if (!userID) {
      alert('You must be logged in to add items to the cart.');
      navigate('/login');
      return;
    }
    try {
      const response = await fetch('/api/cart/addSpecial', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userID,
          specialName: todaySpecial.SpecialName,
          price: todaySpecial.Price - (todaySpecial.Price * todaySpecial.Discount / 100),
          quantity: todaySpecial.quantity
        })
      });
      const data = await response.json();
      if (data.error) {
        alert(`Error: ${data.error}`);
      } else {
        alert(`${todaySpecial.quantity} x ${todaySpecial.SpecialName} has been added to your cart.`);
      }
    } catch (error) {
      console.error('Error adding item to cart:', error);
    }
  };

  const handleQuantityChange = (e) => {
    const newQuantity = Math.max(1, parseInt(e.target.value, 10));
    setTodaySpecial(prev => ({ ...prev, quantity: newQuantity }));
  };

  if (!todaySpecial) {
    return <div>Loading...</div>;
  }

  return (
    <div className="main">
      <div className="text-center">
        <h1>Today's Weekly Special</h1>
        <h2>{todaySpecial.SpecialName}</h2>
        <img src={todaySpecial.imageSrc} alt={todaySpecial.SpecialName} style={{ width: '100%', height: 'auto' }} />
        <p>{todaySpecial.Description}</p>
        <p>Price: ${todaySpecial.Price}</p>
        <p>Discount: {todaySpecial.Discount}%</p>
        <p>Final Price: ${(todaySpecial.Price - (todaySpecial.Price * todaySpecial.Discount / 100)).toFixed(2)}</p>
        <div>
          <label htmlFor="quantity">Quantity:</label>
          <input type="number" id="quantity" value={todaySpecial.quantity} onChange={handleQuantityChange} min="1" />
          <button onClick={addToCart} className="btn checkout-button">Add to Cart</button>
          <br />
          <button onClick={() => navigate('/checkout')} className="btn checkout-button">Go to Checkout</button>
        </div>
      </div>

      <div className="row">
        <div className="col-md-6 shop-organic-groceries">
          <h2>Shop Organic Groceries</h2>
          <img src={food} alt="Organic Food" className="img-fluid" />
          <Link to="/shop" className="btn btn-primary">Shop Now</Link>
          <p>Shop now for the freshest foods</p>
        </div>
        <div className="col-md-6 grow-your-own-food">
          <h2>Review Your Food</h2>
          <img src={review} alt="Review Food" className="img-fluid" />
          <Link to="/review" className="btn btn-primary">Review Now</Link>
          <p>Review your own organic foods</p>
        </div>
      </div>
    </div>
  );
}

export default Specials;
