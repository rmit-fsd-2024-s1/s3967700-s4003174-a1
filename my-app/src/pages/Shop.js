import React from "react";
import food from './organic.jpg';
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
          <h4 className="caption">Advocado</h4>
          </div>
          <div className="col-lg-4">
          <img src={food} alt="Organic Food" style={{ height: 200 }} />
          <h4 className="caption">Beetroot</h4>
          </div>
          <div className="col-lg-4">
          <img src={food} alt="Organic Food" style={{ height: 200 }} />
          <h4 className="caption">Carrot</h4>
          </div>
        </div>
        <br/>
        <div className="row">
          <div className="col-lg-4">
          <img src={food} alt="Organic Food" style={{ height: 200 }} />
          <h4 className="caption">Chilli</h4>
          </div>
          <div className="col-lg-4">
          <img src={food} alt="Organic Food" style={{ height: 200 }} />
          <h4 className="caption">Daikon</h4>
          </div>
          <div className="col-lg-4">
          <img src={food} alt="Organic Food" style={{ height: 200 }} />
          <h4 className="caption">Eggplant</h4>
          </div>
        </div>
        <br/>
        <div className="row">
          <div className="col-lg-4">
          <img src={food} alt="Organic Food" style={{ height: 200 }} />
          <h4 className="caption">Fennel</h4>
          </div>
          <div className="col-lg-4">
          <img src={food} alt="Organic Food" style={{ height: 200 }} />
          <h4 className="caption">Garlic</h4>
          </div>
          <div className="col-lg-4">
          <img src={food} alt="Organic Food" style={{ height: 200 }} />
          <h4 className="caption">Kale</h4>
          </div>
        </div>
        <br/>
        <div className="row">
          <div className="col-lg-4">
          <img src={food} alt="Organic Food" style={{ height: 200 }} />
          <h4 className="caption">Lettuce</h4>
          </div>
          <div className="col-lg-4">
          <img src={food} alt="Organic Food" style={{ height: 200 }} />
          <h4 className="caption">Mushroom</h4>
          </div>
          <div className="col-lg-4">
          <img src={food} alt="Organic Food" style={{ height: 200 }} />
          <h4 className="caption">Tomato</h4>
          </div>
        </div>
        <br/>
      </div>
    </>
  );
}

export default Shop;
