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

function Specials() {
  const navigate = useNavigate();
  const [todaySpecial, setTodaySpecial] = useState({
    name: "",
    special: "",
    highlight: "",
    imageSrc: "",
    price: 0,
    discount: 0,
    quantity: 1 // Ensure default quantity is always 1
  });

  useEffect(() => {
    const images = {
      "Monday": Mondays,
      "Tuesday": Tuesdays,
      "Wednesday": Wednesdays,
      "Thursday": Thursdays,
      "Friday": Fridays,
      "Saturday": Saturdays,
      "Sunday": Sundays
    };

    const weeklySpecials = {
      "Monday": {
        name: "Leafy Greens",
        special: "20% off all leafy greens",
        highlight: "Power Salad Pack bundle featuring a mix of organic leafy greens, cherry tomatoes, and edible flowers.",
        imageSrc: Mondays,
        price: 3.00,
        discount: 20
      },
      "Tuesday": {
        name: "Tropical Fruits",
        special: "50% off on second tropical fruit",
        highlight: "Tropical Smoothie Kit with all necessary ingredients for a refreshing tropical smoothie.",
        imageSrc: Tuesdays,
        price: 4.00,
        discount: 50
      },
      "Wednesday": {
        name: "Organic Teas",
        special: "15% off on organic teas and natural supplements",
        highlight: "Free nutritional consultation sign-ups with any purchase over $50.",
        imageSrc: Wednesdays,
        price: 5.00,
        discount: 15
      },
      "Thursday": {
        name: "Organic Juices",
        special: "10% off on organic juices and milk alternatives",
        highlight: "DIY Almond Milk Kit - includes raw organic almonds, a reusable milk bag, and a recipe card.",
        imageSrc: Thursdays,
        price: 6.00,
        discount: 10
      },
      "Friday": {
        name: "Fresh Vegetables",
        special: "Special discounts on freshly harvested organic vegetables",
        highlight: "Weekend Grill Pack featuring a variety of fresh organic vegetables perfect for grilling, plus a recipe booklet.",
        imageSrc: Fridays,
        price: 12.50,
        discount: 10 
      },
      "Saturday": {
        name: "Seed Packets",
        special: "50% off on second seed packet",
        highlight: "Start Your Garden bundle deal, including organic soil, seedling pots, and a selection of herb and vegetable seeds at a discounted price.",
        imageSrc: Saturdays,
        price: 1.50,
        discount: 50
      },
      "Sunday": {
        name: "Superfoods",
        special: "20% off superfoods",
        highlight: "Superfood Breakfast Kit including a selection of superfoods for a nutritious start to your day.",
        imageSrc: Sundays,
        price: 7.00,
        discount: 20
      }
    };

    const currentDay = new Date().toLocaleString('en-US', { weekday: 'long' });
    const specialData = weeklySpecials[currentDay];

    setTodaySpecial({
      ...specialData,
      imageSrc: images[currentDay],
      quantity: 1 // Reset quantity every time the day changes
    });
  }, []);

  const addToCart = () => {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    const itemToAdd = {
      itemName: todaySpecial.name,  // Ensure this matches the key expected in the checkout
      price: todaySpecial.price - (todaySpecial.price * todaySpecial.discount / 100),
      quantity: todaySpecial.quantity
    };
  
    // Check if the item already exists in the cart
    const existingItem = cartItems.find(item => item.itemName === itemToAdd.itemName);
    if (existingItem) {
      existingItem.quantity += todaySpecial.quantity;  // Update quantity
    } else {
      cartItems.push(itemToAdd);  // Add new item
    }
  
    localStorage.setItem('cart', JSON.stringify(cartItems)); // set to local storage
    alert(`${todaySpecial.quantity} x ${todaySpecial.name} has been added to your cart.`); // alert user successful addition
  };
  

  const handleQuantityChange = (e) => {
    const newQuantity = Math.max(1, parseInt(e.target.value, 10)); // Ensure the quantity cannot go below 1
    setTodaySpecial(prev => ({ ...prev, quantity: newQuantity }));
  };

  return (
    <div className="main">
      <div className="text-center">
        <h1>Today's Weekly Special</h1>
        <h2>{todaySpecial.name}</h2>
        <img src={todaySpecial.imageSrc} alt={todaySpecial.name} style={{ width: '100%', height: 'auto' }} />
        <p>{todaySpecial.special}</p>
        <p>Price: ${todaySpecial.price.toFixed(2)}</p>
        <p>Discount: {todaySpecial.discount}%</p>
        <p>Final Price: ${(todaySpecial.price - (todaySpecial.price * todaySpecial.discount / 100)).toFixed(2)}</p>
        <div>
          <label htmlFor="quantity">Quantity:</label>
          <input type="number" id="quantity" value={todaySpecial.quantity} onChange={handleQuantityChange} min="1" />
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


