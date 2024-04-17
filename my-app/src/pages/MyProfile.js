import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function MyProfile() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState({
    username: '',
    email: '',
    bio: '',
    joinDate: ''
  });

  useEffect(() => {
  }, []);


  const handleEditProfile = () => {
    navigate('/edit-profile'); 
  };


  const getFormattedDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <div className="profile-container">
      <h1>My Profile</h1>
      <hr />
      <div className="profile-field">
        <label>Username:</label>
        <span>{profile.username}</span>
      </div>
      <div className="profile-field">
        <label>Email:</label>
        <span>{profile.email}</span>
      </div>
      <div className="profile-field">
        <label>Bio:</label>
        <span>{profile.bio}</span>
      </div>
      <div className="profile-field">
        <label>Date Joined:</label>
        <span>{profile.joinDate && getFormattedDate(profile.joinDate)}</span>
      </div>
      <button onClick={handleEditProfile} className="edit-profile-btn">
        Edit Profile
      </button>
    </div>
  );
}

export default MyProfile;
