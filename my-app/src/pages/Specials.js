import React from "react";

import "./page.css";

function Specials() {
        return (
          <div className="main">
            <div className="text-center">
              <h2>Food delivered to you 24/7</h2>
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
                <h3>Grow your own foods poop</h3>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-4">
                <p className="caption">Grow your own organic food</p>
              </div>
            </div>
          </div>
        );
      }
  export default Specials;
  