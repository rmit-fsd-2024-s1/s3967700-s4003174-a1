import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import axios from 'axios';

import Navbar from "./fragments/Navbar";
import Footer from "./fragments/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import MyProfile from "./pages/MyProfile";
import SignUp from "./pages/SignUp";
import Shop from "./pages/Shop";
import Specials from "./pages/Specials";
import Review from "./pages/Review";
import Checkout from "./pages/Checkout";
import Payment from "./pages/Payment";
import Summary from "./pages/Summary";

function App() {
  const [username, setUsername] = useState("");

  useEffect(() => {
    const validateSession = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/users/validate-session', {
          withCredentials: true
        });
        if(response.data && response.data.user) {
          setUsername(response.data.user.Username); // Assuming the user object is returned with a Username field
          console.log("Session valid, user:", response.data.user.Username);
        } else {
          throw new Error("Session data incomplete or missing.");
        }
      } catch (error) {
        console.log("Session validation error:", error);
        setUsername(null); // Reset username if session validation fails
      }
    };

    validateSession();
  }, []);


  const loginUser = (username) => {
    setUsername(username);
  };

  const logoutUser = () => {
    setUsername(null);
    // You might want to also make a request to log out on the server side
    axios.post('http://localhost:4000/api/users/logout', {}, { withCredentials: true })
      .then(() => {
        console.log("Logged out successfully.");
      })
      .catch(error => {
        console.error("Logout error:", error);
      });
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <Router>
        <Navbar username={username} logoutUser={logoutUser} />
        <main role="main">
          <div className="container my-3">
            <Routes>
              <Route path="/" element={<Home username={username} />} />
              <Route path="/login" element={<Login loginUser={loginUser} />} />
              <Route path="/signUp" element={<SignUp loginUser={loginUser} />} />
              <Route path="/profile" element={<MyProfile username={username} />} />
              <Route path="/shop" element={<Shop username={username} />} />
              <Route path="/specials" element={<Specials username={username} />} />
              <Route path="/review" element={<Review username={username} />} />
              <Route path="/checkout" element={<Checkout username={username} />} />
              <Route path="/payment" element={<Payment username={username} />} />
              <Route path="/summary" element={<Summary username={username} />} />
            </Routes>
          </div>
        </main>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
