import React from "react";
import { Link } from "react-router-dom";
import food from './images/organic.jpg';
import vegetables from './images/vegetables.jpg'
import special from './images/specials.jpg';
import plant from './images/plant.jpg';
import "./page.css";

function Section({ title, imageSrc, buttonText, buttonLink, caption }) {
  return (
    <div className="col-lg-4">
      <Link className="nav-link" to={buttonLink}>
        <img src={imageSrc} alt={title} style={{ height: 200 }} />
      </Link>
      <Link className="shop-button" to={buttonLink}>
        <button className="highlight-on-hover">{buttonText}</button>
      </Link>
      <p className="caption">{caption}</p>
    </div>
  );
}

function Home(props) {
  return (
    <div className="main">
      <div className="text-center">
        <h2>Food delivered to you 24/7</h2>
        <img src={food} alt="Organic Food" style={{ height: 300 }} />
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
        <div className="text-options-1">
          <h3>Shop Organic Groceries</h3>
        </div>
        <div className="text-options-2">
          <h3>Weekly Special Deals</h3>
        </div>
        <div className="text-options-3">
          <h3>Grow your own foods</h3>
        </div>
      </div>
      <div className="row">
        <Section
          title="Organic Food"
          imageSrc={vegetables}
          buttonText="Shop Now"
          buttonLink="/shop"
          caption="Shop now for the freshest foods"
        />
        <Section
          title="Special Deals"
          imageSrc={special}
          buttonText="Shop Now"
          buttonLink="/specials"
          caption="Check out our weekly specials"
        />
        <Section
          title="Grow Food"
          imageSrc={plant}
          buttonText="Grow Now"
          buttonLink="/plant"
          caption="Grow your own organic food"
        />
      </div>
    </div>
  );
}

export default Home;




