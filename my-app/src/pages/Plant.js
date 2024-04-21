import React from 'react';
import grow from './images/growing.jpg';
import pick from './images/pick.jpg';
import prep from './images/prep.jpg';
import water from './images/water.jpg';
import './page.css';

function Plant() {
  return (
    <div className="plant-guide-container">
      <h2>Guide to Grow Your Own Vegetables</h2>
      <p>
        Growing vegetables in your own backyard is not only easy but also saves you a lot of money and ensures you have fresh, organic produce right at your fingertips.
      </p>
      <div className="image-container">
        <img src={grow} alt='Growing vegetables' className="guide-image" />
      </div>
      <h3>Tips to Get You Started:</h3>
      <h4>Choose the Right Plants</h4>
      <div className="image-container smaller-image">
        <img src={pick} alt='Choosing plants' className="guide-image" />
      </div>
      <p>
        It's important to select vegetables suitable for your climate conditions and garden size. Some vegetables thrive in sunlight, while others prefer shade. Beginners may find tomatoes, carrots, lettuce, and spring onions easy to grow. Consider also the soil type, as some plants do better in sandy soils while others prefer clay.
      </p>

      <h4>Prepare the Soil</h4>
      <div className="image-container smaller-image">
        <img src={prep} alt='Preparing soil' className="guide-image" />
      </div>
      <p>
        Good soil is crucial for successful gardening. Prepare garden beds by digging and adding compost 1-2 weeks before planting. Ensure the compost breaks down and enriches the soil before adding plants. Testing your soil's pH and nutrient levels can guide you on what amendments are needed for optimum plant growth.
      </p>
      <h4>Take Care of Your Plants</h4>
      <div className="image-container smaller-image">
        <img src={water} alt='Watering plants' className="guide-image" />
      </div>
      <p>
        After planting, apply mulch to protect the plants. Regular watering is essential for root development and plant strength. Monitor soil moisture levels to avoid overwatering, which can lead to root diseases. Remove invasive weeds and pests promptly to maintain plant health. Regular pruning might be necessary to encourage fruiting and prevent diseases.
      </p>
      <p>With these tips, you can enjoy a bountiful harvest of fresh vegetables right from your own backyard!</p>
    </div>
  );
}

export default Plant;
