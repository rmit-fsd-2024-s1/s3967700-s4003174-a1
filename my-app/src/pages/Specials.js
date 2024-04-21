import React, { useEffect, useState } from "react";
import Mondays from './images/Mondays.jpg';
import Tuesdays from './images/Tuesdays.jpg';
import Wednesdays from './images/Wednesdays.jpg';
import Thursdays from './images/Thursdays.jpg';
import Fridays from './images/Fridays.jpg';
import Saturdays from './images/Saturdays.jpg';
import Sundays from './images/Sundays.jpg';
import "./page.css";

function Specials() {
  const [todaySpecial, setTodaySpecial] = useState({
    name: "",
    special: "",
    highlight: "",
    imageSrc: "",
    price: 0,
    discount: 0
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

    // Store the specials in local storage
    localStorage.setItem("weeklySpecials", JSON.stringify(weeklySpecials));

    // Determine today's special
    const currentDay = new Date().toLocaleString('en-US', { weekday: 'long' });
    const specialsData = JSON.parse(localStorage.getItem("weeklySpecials"));
    const todaySpecialData = specialsData[currentDay];

    // Update state with today's special data
    setTodaySpecial({
      ...todaySpecialData,
      imageSrc: images[currentDay]
    });
  }, []);

  // Calculate price after discount
  const priceAfterDiscount = (price, discount) =>
    (price - price * (discount / 100)).toFixed(2);

  return (
    <div className="main">
      <div className="text-center">
        <h1>Today's Weekly Special</h1>
        <h2>{todaySpecial.name}</h2>
        <img src={todaySpecial.imageSrc} alt={todaySpecial.name} style={{ width: '100%', height: 'auto' }} />
        <p className="item-price">Price: ${todaySpecial.price.toFixed(2)}</p>
        <p className="item-discount">Discount: {todaySpecial.discount}%</p>
        <p className="final-price">Final Price: ${priceAfterDiscount(todaySpecial.price, todaySpecial.discount)}</p>
        <div className="quantity-selection">
          <label htmlFor="quantity">Quantity:</label>
          <input id="quantity" type="number" defaultValue={1} min={1} />
          <button className="add-to-cart">Add to Cart</button>
        </div>
      </div>
    </div>
  );
}

export default Specials;
