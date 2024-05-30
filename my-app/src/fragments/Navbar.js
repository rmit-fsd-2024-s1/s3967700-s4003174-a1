import React from "react";
import { Link } from "react-router-dom";
import "./Fragment.css";
import cart from "./cart.jpg";
import home from "./home.jpg";

function Navbar(props) {
  return (
    <nav className="navbar navbar-expand-lg navbar-light">
      <div className="container">
        <Link className="navbar-brand nav-link" to="/">SOIL</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
            <Link className="nav-link" to="/">             {/* home icon */}
                <img src={home} alt="Home" style={{ width: '30px', height: '30px' }} />
              </Link>
            </li>
            {props.username !== null &&
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/profile">Profile</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/shop">Shop Now</Link>
                </li>
                <li className="nav-item">
              <Link className="nav-link" to="/specials">Shop Specials</Link>
            </li>
              </>
            }
            <li className="nav-item">
              <Link className="nav-link" to="/Review">Reviews</Link>
            </li>
          </ul>
          <ul className="navbar-nav ml-auto">
            {props.username === null ?
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">Login</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/signup">Sign Up</Link>
                </li>
              </>
              :
              <>
                <li className="nav-item">
                  <span className="nav-link text-light">Welcome, {props.username}</span>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/" onClick={props.logoutUser}>Logout</Link>
                </li>
              </>
            }
            <li className="nav-item"> 
              <Link className="nav-link" to="/checkout">             {/* shopping cart icon */}
                <img src={cart} alt="Cart" style={{ width: '30px', height: '30px' }} />
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;