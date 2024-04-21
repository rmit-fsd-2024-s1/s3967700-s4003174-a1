import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./fragments/Navbar";
import Footer from "./fragments/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import MyProfile from "./pages/MyProfile";
import Forum from "./pages/Forum";
import SignUp from "./pages/SignUp";
import Shop from "./pages/Shop";
import Specials from "./pages/Specials";
import Plant from "./pages/Plant";
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
    setUsername(""); 
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
              <Route path="/forum" element={<Forum username={username} />} />
              <Route path="/shop" element={<Shop username={username} />} />
              <Route path="/specials" element={<Specials username={username} />} />
              <Route path="/plant" element={<Plant username={username} />} />
            </Routes>
          </div>
        </main>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
