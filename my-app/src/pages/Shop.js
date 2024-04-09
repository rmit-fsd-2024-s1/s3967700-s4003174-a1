import React from "react";
import food from './images/organic.jpg';
import "./page.css";

function Shop(props) {
  return (
    <>
      <div className="main">
        <div className="text-center">
          <h2>All ingrediants are grown locally and organic</h2>
        </div>
        <br/>
        <br/>
        <br/>
        <div className="row">
          <div className="col-lg-4">
          <img src={food} alt="Organic Food" style={{ height: 200 }} />
          <h4 className="caption-shop">Advocado - $5.35</h4>
          </div>
          <div className="col-lg-4">
          <img src={food} alt="Organic Food" style={{ height: 200 }} />
          <h4 className="caption-shop">Cabbage - $8.20</h4>
          </div>
          <div className="col-lg-4">
          <img src={food} alt="Organic Food" style={{ height: 200 }} />
          <h4 className="caption-shop">Carrot - $4.55</h4>
          </div>
        </div>
        <br/>
        <div className="row">
          <div className="col-lg-4">
          <img src={food} alt="Organic Food" style={{ height: 200 }} />
          <h4 className="caption-shop">Chillies 100g - $5.29</h4>
          </div>
          <div className="col-lg-4">
          <img src={food} alt="Organic Food" style={{ height: 200 }} />
          <h4 className="caption-shop">Cucumber - $5.99</h4>
          </div>
          <div className="col-lg-4">
          <img src={food} alt="Organic Food" style={{ height: 200 }} />
          <h4 className="caption-shop">Eggplant - $5.95</h4>
          </div>
        </div>
        <br/>
        <div className="row">
          <div className="col-lg-4">
          <img src={food} alt="Organic Food" style={{ height: 200 }} />
          <h4 className="caption-shop">Fennel - $4.97</h4>
          </div>
          <div className="col-lg-4">
          <img src={food} alt="Organic Food" style={{ height: 200 }} />
          <h4 className="caption-shop">Garlic 100g - $8.92</h4>
          </div>
          <div className="col-lg-4">
          <img src={food} alt="Organic Food" style={{ height: 200 }} />
          <h4 className="caption-shop">Kale - $5.47</h4>
          </div>
        </div>
        <br/>
        <div className="row">
          <div className="col-lg-4">
          <img src={food} alt="Organic Food" style={{ height: 200 }} />
          <h4 className="caption-shop">Lettuce - $5.99</h4>
          </div>
          <div className="col-lg-4">
          <img src={food} alt="Organic Food" style={{ height: 200 }} />
          <h4 className="caption-shop">Mushrooms 150g - $7.79</h4>
          </div>
          <div className="col-lg-4">
          <img src={food} alt="Organic Food" style={{ height: 200 }} />
          <h4 className="caption-shop">Tomatoes 500g - $9.79</h4>
          </div>
        </div>
        <br/>
      </div>
    </>
  );
}

export default Shop;
