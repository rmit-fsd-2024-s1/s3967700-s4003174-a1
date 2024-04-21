import React, { useEffect, useState } from "react";
import "./page.css";

function Specials() {
  const [todaySpecial, setTodaySpecial] = useState({
    name: "",
    special: "",
    highlight: ""
  });

  useEffect(() => {
    const weeklySpecials = {
      "Monday": {
        name: "Green Monday",
        special: "20% off all leafy greens (kale, spinach, arugula)",
        highlight: "Power Salad Pack bundle featuring a mix of organic leafy greens, cherry tomatoes, and edible flowers."
      },
      "Tuesday": {
        name: "Tropical Tuesday",
        special: "Buy one get one half off on all tropical fruits (mangoes, pineapples, papayas)",
        highlight: "Tropical Smoothie Kit with all necessary ingredients for a refreshing tropical smoothie."
      },
      "Wednesday": {
        name: "Wellness Wednesday",
        special: "15% off on organic teas and natural supplements",
        highlight: "Free nutritional consultation sign-ups with any purchase over $50."
      },
      "Thursday": {
        name: "Thirsty Thursday",
        special: "10% off on organic juices and milk alternatives (almond milk, soy milk, oat milk)",
        highlight: "DIY Almond Milk Kit - includes raw organic almonds, a reusable milk bag, and a recipe card."
      },
      "Friday": {
        name: "Fresh Friday",
        special: "Special discounts on freshly harvested organic vegetables",
        highlight: "Weekend Grill Pack featuring a variety of fresh organic vegetables perfect for grilling, plus a recipe booklet."
      },
      "Saturday": {
        name: "Seedling Saturday",
        special: "Buy one, get one free on all seed packets for home gardening.",
        highlight: "Start Your Garden bundle deal, including organic soil, seedling pots, and a selection of herb and vegetable seeds at a discounted price."
      },
      "Sunday": {
        name: "Superfood Sunday",
        special: "20% off superfoods (chia seeds, quinoa, goji berries, avocados)",
        highlight: "Superfood Breakfast Kit including a selection of superfoods for a nutritious start to your day."
      }
    };

    localStorage.setItem("weeklySpecials", JSON.stringify(weeklySpecials));

    const currentDay = new Date().toLocaleString('en-US', { weekday: 'long' });
    const specialsData = JSON.parse(localStorage.getItem("weeklySpecials"));
    setTodaySpecial(specialsData[currentDay]); // Update this line to correctly update state
  }, []);

  return (
    <div className="main">
      <div className="text-center">
        <h1>Today's Weekly Special</h1>
        <h2>{todaySpecial.name}</h2>
        <p><strong>Special:</strong> {todaySpecial.special}</p>
        <p><strong>Highlight:</strong> {todaySpecial.highlight}</p>
        {/* Image placeholder for the special */}
        <img src="#" alt="Special of the day" style={{ width: '100%', height: 'auto' }} />
      </div>
      <br />
      <p className='content'>
        Here at SOIL we offer 24/7 fast and fresh organic foods. 
        Our organisation aims to provide our customers with local foods 
        provided by our local farmers. Every purchase made helps us get one 
        step closer to a greener and healthier planet.
      </p>
      <br />
      <div className="row">
        <div className="col-lg-6">
          <h3>Shop Organic Groceries</h3>
        </div>
        <div className="col-lg-6">
          <h3>Grow your own foods</h3>
        </div>
      </div>
    </div>
  );
}

export default Specials;
