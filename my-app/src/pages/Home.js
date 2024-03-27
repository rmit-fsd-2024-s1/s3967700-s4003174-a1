import React from "react";
import food from './organic.jpg';

function Home(props) {
  return (
    <><div className="text-center">
      <h1 className="main">Tasty, Fresh, Organic SOIL</h1>
      {props.username !== null && <h4><strong>Hello {props.username}!</strong></h4>} <br></br>
    </div>
      <div className="main">
      <h3>Lorem ipsum dolor</h3>
      <div className="text-center">
      <img src={food} alt="Organic Food" style={{ height: 500 }}/>
      </div>
        <p>Nisi vitae suscipit..</p>
        <p>
          Semper quis lectus nulla at. Nullam ac tortor vitae purus faucibus
          ornare suspendisse. Nunc faucibus a pellentesque sit. Risus quis varius
          quam quisque id diam vel quam elementum. Ornare aenean euismod elementum
          nisi quis eleifend quam.
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
