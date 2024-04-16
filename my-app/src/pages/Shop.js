import React, { useState } from "react";
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

function Shop(props) {
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

  function ShopItem({ itemName, itemLink, price }) {
    const [quantity, setQuantity] = useState(1);

    const handleQuantityChange = (event) => {
      const value = parseInt(event.target.value);
      setQuantity(value);
    };

    return (
      <div className="col-lg-4" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <div style={{ textAlign: "center" }}>
          <img src={itemLink} alt={itemName} style={{ height: 200 }} />
          <h4 className="caption-shop">{itemName} - ${price}</h4>
        </div>
        {props.username !== null && (
          <div style={{ marginTop: '10px' }}>
            <label style={{ marginRight: '5px' }}>Quantity:</label>
            <input
              type="number"
              id="quantity"
              min="1" // user cant add 0 or negative items to cart
              value={quantity}
              onChange={handleQuantityChange}
              style={{ width: '50px', marginRight: '10px' }}
            />
            <button className="highlight-on-hover">Add to cart</button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="main">
      <div className="text-center">
        <h2>All ingredients are grown locally and organic</h2>
      </div>
      <br />
      <br />
      <br />
      <div className="row">
        {items.map((item, index) => (
          <ShopItem
            key={index}
            itemName={item.itemName}
            itemLink={item.itemLink}
            price={item.price}
          />
        ))}
      </div>
    </div>
  );
}

export default Shop;
