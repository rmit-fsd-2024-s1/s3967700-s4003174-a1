import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function MyProfile() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState({
    username: "",
    email: "",
    bio: "",
    joinDate: ""
  });

  useEffect(() => {
    let userDataString = localStorage.getItem("user");
  
    if (userDataString) {
      try {
        let userData = JSON.parse(userDataString);

        setProfile({
          username: userData.username,
          email: userData.email,
          bio: userData.bio || "No bio provided",
          joinDate: userData.joinDate || new Date().toISOString()
        });
      } catch (error) {
        console.error("Failed to parse user data:", error);


        localStorage.removeItem("user");
        navigate("/login");
      }
    } else {
      console.error("No user data available, redirecting to login.");
      navigate("/login");
    }
  }, [navigate]);
  

  return (
    <div>
      <h1>My Profile</h1>
      <hr />
      {/* Profile display components */}
    </div>
  );
}

export default MyProfile;
