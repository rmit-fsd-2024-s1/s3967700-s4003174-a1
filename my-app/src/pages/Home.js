import React from "react";
import food from './organic.jpg';
import "./page.css";
import { Link } from "react-router-dom";

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
          <Link className="nav-link" to="/shop">
          <img src={food} alt="Organic Food" style={{ height: 200 }} />
          </Link>
          </div>
          <div className="col-lg-4">
          <Link className="nav-link" to="/profile">
          <img src={food} alt="Organic Food" style={{ height: 200 }} />
          </Link>
          </div>
          <div className="col-lg-4">
          <Link className="nav-link" to="/profile">
          <img src={food} alt="Organic Food" style={{ height: 200 }} />
          </Link>
          </div>
        </div>
        <br />
        <div className="row">
      <div>
        <p className='para-options-1'>Shop now for the freshest foods</p>
      </div>
      <div>
        <p className="para-options-2">Check out our weekly specials</p>
      </div>
      <div>
        <p className="para-options-3">Grow your own organic food</p>
      </div>
    </div>
      </div>
    </>
  );
}

export default Home;



