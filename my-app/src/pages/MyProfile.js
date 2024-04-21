import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUser, removeUser, saveUser } from '../data/repository';

function MyProfile() {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: '',
    username: '',
    email: '',
    bio: '',
    joinDate: ''
  });

  useEffect(() => {
    const user = getUser(); 
    if (user) {
      setProfile(user);
    } else {
      navigate('/login');
    }
  }, [navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setProfile(getUser());
  };

  const handleSave = () => {
    saveUser(profile);
    setIsEditing(false);
    alert('Profile updated successfully.');
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete your profile? This action cannot be undone.')) {
      removeUser();
      navigate('/');
      alert('Profile deleted successfully.');
    }
  };

  return (
    <div className="profile-container">
      <h1>My Profile</h1>
      <hr />
      {isEditing ? (
        <div>
          <div className="profile-field">
            <label>Name: </label>
            <input type="text" value={profile.name} onChange={handleInputChange} name="name" />
          </div>
          <div className="profile-field">
            <label>Email: </label>
            <input type="email" value={profile.email} onChange={handleInputChange} name="email" />
          </div>
          <div className="profile-field">
            <label>Bio: </label>
            <textarea value={profile.bio} onChange={handleInputChange} name="bio"></textarea>
          </div>
          <button onClick={handleSave} className="btn btn-success">Save</button>
          <button onClick={handleCancel} className="btn btn-secondary">Cancel</button>
        </div>
      ) : (
        <div>
          <div className="profile-field">
            <label>Name: </label>
            <span>{profile.name}</span>
          </div>
          <div className="profile-field">
            <label>Email: </label>
            <span>{profile.email}</span>
          </div>
          <div className="profile-field">
            <label>Bio: </label>
            <span>{profile.bio || 'No bio provided'}</span>
          </div>
          <div className="profile-field">
            <label>Joined: </label>
            <span>{new Date(profile.joinDate).toLocaleDateString()}</span>
          </div>
          <button onClick={handleEdit} className="btn btn-primary">Edit</button>
          <button onClick={handleDelete} className="btn btn-danger">Delete</button>
        </div>
      )}
    </div>
  );
}

export default MyProfile;
