import React from "react";
import food from './organic.jpg';
import "./page.css";

function Home(props) {
  return (
    <>
      <div className="main">
        <div className="text-center">
          <h2>Food delivered to you 24/7</h2>
          <img src={food} alt="Organic Food" style={{ height: 300 }}/>
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
          <div className="col-lg-4">
            <img src={food} alt="Organic Food" style={{ height: 200 }}/>
          </div>
          <div className="col-lg-4">
            <img src={food} alt="Organic Food" style={{ height: 200 }}/>
          </div>
          <div className="col-lg-4">
            <img src={food} alt="Organic Food" style={{ height: 200 }}/>
          </div>
        </div>
        <br />
        <div className="row">
      <div className="col-lg-4">
        Shop now for the freshest foods
      </div>
      <div className="col-lg-4">
        Check out our weekly specials
      </div>
      <div className="col-lg-4">
        Grow your own organic food
      </div>
    </div>
      </div>
    </>
  );
}

export default Home;



