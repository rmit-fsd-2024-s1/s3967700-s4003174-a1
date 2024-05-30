import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
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
import { getUser, removeUser } from "./data/repository";

function App() {
  const [username, setUsername] = useState("");

  useEffect(() => {
    const user = getUser(); 
    if (user) {
      setUsername(user.username); 
    }
  }, []);

  const loginUser = (username) => {
    setUsername(username); 
  }

  const logoutUser = () => {
    removeUser();
    setUsername(null); 
  }

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
