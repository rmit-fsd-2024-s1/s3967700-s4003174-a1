import React from "react";
import food from './organic.jpg';
import "./page.css";

function Home(props) {
  return (
    <>
      <div className="main">
      <div className="text-center">
      <h2>Food delivered to you 24/7</h2>
      <img src={food} alt="Organic Food" style={{ height: 500 }}/>
      </div> <br></br>
        <p className='content'>
          Here at SOIL we offer 24/7 fast and fresh organic foods. 
          Our organisation aims to provide our customers with local foods 
          provided by our local farmers. Every purchase made helps us get one 
          step closer to a greener and healthier planet.
        </p>
        <br />
        <h3>Placerat vestibulum</h3>
        <div className="fakeimg" style={{ height: 500 }}>
          Image
        </div>
        <p>Bibendum est ultricies..</p>
        <p>
          Semper quis lectus nulla at. Nullam ac tortor vitae purus faucibus
          ornare suspendisse. Nunc faucibus a pellentesque sit. Risus quis varius
          quam quisque id diam vel quam elementum.
        </p>
      </div></>
    
  );
}

export default Home;
