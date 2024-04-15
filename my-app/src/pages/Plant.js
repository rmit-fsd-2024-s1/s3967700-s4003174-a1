import React from 'react';
import grow from './images/growing.jpg';

function Plant() {
  return (
    <div>
      <h2>Guide to Grow Your Own Vegetables</h2>
      <p>
        Growing vegetables in your own backyard is not only easy but also saves you a lot of money.
      </p>
      <img src={grow} alt='growing vegetables' style={{ height: 500 }} />
      <h3>Tips to Get You Started:</h3>
      <h4>Choose the Right Plants</h4>
      <p>
        It's important to select vegetables suitable for your climate conditions and garden size. 
        Some vegetables thrive in sunlight, while others prefer shade. 
        Beginners may find tomatoes, carrots, lettuce, and spring onions easy to grow.
      </p>
      <h4>Prepare the Soil</h4>
      <p>
        Good soil is crucial for successful gardening. 
        Prepare garden beds by digging and adding compost 1-2 weeks before planting. 
        Ensure the compost breaks down and enriches the soil before adding plants.
      </p>
      <h4>Take Care of Your Plants</h4>
      <p>
        After planting, apply mulch to protect the plants. 
        Regular watering is essential for root development and plant strength. 
        Remove invasive weeds and pests promptly to maintain plant health.
      </p>
      <p>With these tips, you can enjoy a bountiful harvest of fresh vegetables right from your own backyard!</p>
    </div>
  );
}

export default Plant;
