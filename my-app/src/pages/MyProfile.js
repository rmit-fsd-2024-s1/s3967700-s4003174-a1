import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUser, setUser } from '../data/repository';

function MyProfile() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState({
    username: '',
    email: '',
    bio: '',
    joinDate: ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editProfile, setEditProfile] = useState({});

  useEffect(() => {
    const user = getUser(); 
    if (user) {
      setProfile({
        username: user.username,
        email: user.email,
        bio: user.bio || 'No bio provided',
        joinDate: user.joinDate || new Date().toISOString()
      });
      setEditProfile({
        username: user.username,
        email: user.email,
        bio: user.bio || 'No bio provided',
      });
    } else {
      navigate('/login');
    }
  }, [navigate]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setEditProfile(prev => ({ ...prev, [name]: value }));
  };

  const saveChanges = () => {
    setUser({...profile, ...editProfile});
    setProfile(prev => ({ ...prev, ...editProfile }));
    setIsEditing(false);
  };

  const cancelEdit = () => {
    setEditProfile({
      username: profile.username,
      email: profile.email,
      bio: profile.bio,
    });
    setIsEditing(false);
  };

  const formattedJoinDate = profile.joinDate
    ? new Date(profile.joinDate).toLocaleDateString("en-US", {
      year: 'numeric', month: 'long', day: 'numeric'
    })
    : 'Not available';

  return (
    <div className="profile-container">
      <h1>My Profile</h1>
      <hr />
      {isEditing ? (
        <>
          <div className="form-group">
            <label>Username: </label>
            <input type="text" value={editProfile.username} name="username" onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Email: </label>
            <input type="email" value={editProfile.email} name="email" onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Bio: </label>
            <textarea value={editProfile.bio} name="bio" onChange={handleChange}></textarea>
          </div>
          <button onClick={saveChanges} className="btn btn-success">Save</button>
          <button onClick={cancelEdit} className="btn btn-secondary">Cancel</button>
        </>
      ) : (
        <>
          <div><strong>Username:</strong> {profile.username}</div>
          <div><strong>Email:</strong> {profile.email}</div>
          <div><strong>Bio:</strong> {profile.bio}</div>
          <div><strong>Date Joined:</strong> {formattedJoinDate}</div>
          <button onClick={() => setIsEditing(true)} className="btn btn-primary">Edit Profile</button>
        </>
      )}
    </div>
  );
}

export default MyProfile;
