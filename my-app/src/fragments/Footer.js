import React from "react";
import "./Fragment.css";
function Footer() {
  return (
    <footer className="footer bg-dark text-white py-4">
      <div className="container">
        <div className="row">
          <div className="col-md-3">
            <h5>Contact Us</h5>
            <ul className="list-unstyled">
              <li>(123) 456-7890</li>
              <li>info@soil.com</li>
            </ul>
          </div>
          <div className="col-md-3">
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li><span className="text-light">About Us</span></li>
              <li><span className="text-light">FAQs</span></li>
              <li><span className="text-light">Privacy Policy</span></li>
            </ul>
          </div>
          <div className="col-md-3">
            <h5>Follow Us</h5>
            <ul className="list-unstyled">
              <li><a href="https://facebook.com" className="text-light">Facebook</a></li>
              <li><a href="https://instagram.com" className="text-light">Instagram</a></li>
              <li><a href="https://twitter.com" className="text-light">Twitter</a></li>
            </ul>
          </div>
          <div className="col-md-3">
            <h5>Sustainability</h5>
            <p>We are committed to reducing our carbon footprint and supporting local farmers by providing organic and sustainable products.</p>
          </div>
        </div>
        <div className="text-center mt-3">
          Healthy, Fresh, Organic SOIL &copy; 2024
        </div>
      </div>
    </footer>
  );
}

export default Footer;
