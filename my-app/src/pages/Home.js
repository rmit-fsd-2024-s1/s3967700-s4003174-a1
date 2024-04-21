import React from "react";
import { Link } from "react-router-dom";
import food from './images/organic.jpg';
import vegetables from './images/vegetables.jpg'
import special from './images/specials.jpg';
import plant from './images/plant.jpg';
import "./page.css";

function Section({ title, imageSrc, buttonText, buttonLink, caption }) {
  return (
    <div className="col-md-4 text-center">
      <h2>{title}</h2>
      <Link to={buttonLink}>
        <img src={imageSrc} alt={title} className="img-fluid" />
      </Link>
      <Link to={buttonLink} className="btn btn-primary">
        {buttonText}
      </Link>
      <p>{caption}</p>
    </div>
  );
}

function Home() {
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
        <Section
          title="Shop Organic Groceries"
          imageSrc={vegetables}
          buttonText="Shop Now"
          buttonLink="/shop"
          caption="Shop now for the freshest foods"
        />
        <Section
          title="Special Deals"
          imageSrc={special}
          buttonText="View Deals"
          buttonLink="/specials"
          caption="Discover our exclusive weekly deals"
        />
        <Section
          title="Grow Your Own Food"
          imageSrc={plant}
          buttonText="Grow Now"
          buttonLink="/plant"
          caption="Start your organic garden today"
        />
      </div>
    </div>
  );
}

export default Home;




