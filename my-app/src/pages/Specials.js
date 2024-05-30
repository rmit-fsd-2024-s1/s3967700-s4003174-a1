import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import Mondays from './images/Mondays.jpg';
import Tuesdays from './images/Tuesdays.jpg';
import Wednesdays from './images/Wednesdays.jpg';
import Thursdays from './images/Thursdays.jpg';
import Fridays from './images/Fridays.jpg';
import Saturdays from './images/Saturdays.jpg';
import Sundays from './images/Sundays.jpg';
import food from './images/organic.jpg';
import plant from './images/plant.jpg';
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

  useEffect(() => {
    const currentDay = new Date().toLocaleString('en-US', { weekday: 'long' });

    // Fetch today's special from the database
    fetch(`/api/specials`)
      .then(response => response.json())
      .then(data => {
        const specialData = data.find(special => special.DayOfWeek === currentDay);
        if (specialData) {
          setTodaySpecial({
            ...specialData,
            Price: parseFloat(specialData.Price),  // Ensure Price is a number
            imageSrc: images[currentDay],
            quantity: 1 // Reset quantity every time the day changes
          });
        }
      })
      .catch(error => console.error('Error fetching specials:', error));
  }, []);

  const addToCart = () => {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    const itemToAdd = {
      itemName: todaySpecial.SpecialName,
      price: todaySpecial.Price - (todaySpecial.Price * todaySpecial.Discount / 100),
      quantity: todaySpecial.Quantity
    };

    const existingItem = cartItems.find(item => item.itemName === itemToAdd.itemName);
    if (existingItem) {
      existingItem.quantity += todaySpecial.Quantity;
    } else {
      cartItems.push(itemToAdd);
    }

    localStorage.setItem('cart', JSON.stringify(cartItems));
    alert(`${todaySpecial.Quantity} x ${todaySpecial.SpecialName} has been added to your cart.`);
  };

  const handleQuantityChange = (e) => {
    const newQuantity = Math.max(1, parseInt(e.target.value, 10));
    setTodaySpecial(prev => ({ ...prev, Quantity: newQuantity }));
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
        <p>Price: ${todaySpecial.Price.toFixed(2)}</p>
        <p>Discount: {todaySpecial.Discount}%</p>
        <p>Final Price: ${(todaySpecial.Price - (todaySpecial.Price * todaySpecial.Discount / 100)).toFixed(2)}</p>
        <div>
          <label htmlFor="quantity">Quantity:</label>
          <input type="number" id="quantity" value={todaySpecial.Quantity} onChange={handleQuantityChange} min="1" />
          <button onClick={addToCart} className="btn checkout-button">Add to Cart</button>
          <br/>
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
          <h2>Grow Your Own Food</h2>
          <img src={plant} alt="Grow Food" className="img-fluid" />
          <Link to="/plant" className="btn btn-primary">Grow Now</Link>
          <p>Grow your own organic foods</p>
        </div>
      </div>
    </div>
  );
}

export default Specials;


