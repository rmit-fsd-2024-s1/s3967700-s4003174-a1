import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUser } from '../data/repository';

function MyProfile() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState({
    username: '',
    email: '',
    bio: '',
    joinDate: ''
  });

  useEffect(() => {
    const user = getUser(); 
    if (user) {
      setProfile({
        username: user.username,
        email: user.email,
        bio: user.bio || 'No bio provided',
        joinDate: user.joinDate || new Date().toISOString()
      });
    } else {
      navigate('/login');
    }
  }, [navigate]);

  //formatting the date
  const formattedJoinDate = profile.joinDate
    ? new Date(profile.joinDate).toLocaleDateString("en-US", {
      year: 'numeric', month: 'long', day: 'numeric'
    })
    : 'Not available';

  const handleEditProfile = () => {
    navigate('/edit-profile'); 
  };

  return (
    <div className="profile-container">
      <h1>My Profile</h1>
      <hr />
      <div className="profile-field">
        <label>Username: </label>
        {profile.username}
      </div>
      <div className="profile-field">
        <label>Email: </label>
        {profile.email}
      </div>
      <div className="profile-field">
        <label>Bio: </label>
        {profile.bio}
      </div>
      <div className="profile-field">
        <label>Date Joined: </label>
        {formattedJoinDate}
      </div>
      <button onClick={handleEditProfile} className="edit-profile-btn">
        Edit Profile
      </button>
    </div>
  );
  
  
}

export default MyProfile;
