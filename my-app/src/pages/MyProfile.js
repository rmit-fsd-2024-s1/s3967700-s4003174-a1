import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUser, saveUser, deleteUser, removeUser } from '../data/repository';
import "./page.css";

function MyProfile() {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
    bio: '',
    joinDate: ''
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const user = getUser();
    if (user) {
      setProfile(user);
    } else {
      alert('Please log in to view profile.');
      navigate('/login');
    }
  }, [navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!profile.name) newErrors.name = "Name is required.";
    if (!profile.username) newErrors.username = "Username is required.";
    if (!profile.email) newErrors.email = "Email is required.";
    if (!/^\S+@\S+\.\S+$/.test(profile.email)) newErrors.email = "Invalid email format.";
    if (profile.password && !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(profile.password))
      newErrors.password = "Password must be at least 8 characters long, include an uppercase letter, a lowercase letter, and a number.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleEdit = () => {
    setIsEditing(true);
    setErrors({});
  };

  const handleCancel = () => {
    setIsEditing(false);
    setErrors({});
    setProfile(getUser());
  };

  const handleSave = () => {
    if (!validateForm()) return;

    saveUser(profile);
    setIsEditing(false);
    alert('Profile updated successfully.');
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete your profile? This action cannot be undone.')) {
      deleteUser(profile.username);
      removeUser();
      alert('Profile deleted successfully.');
      navigate('/');
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
            {errors.name && <div className="error">{errors.name}</div>}
          </div>
          <div className="profile-field">
            <label>Username: </label>
            <input type="text" value={profile.username} onChange={handleInputChange} name="username" />
            {errors.username && <div className="error">{errors.username}</div>}
          </div>
          <div className="profile-field">
            <label>Email: </label>
            <input type="email" value={profile.email} onChange={handleInputChange} name="email" />
            {errors.email && <div className="error">{errors.email}</div>}
          </div>
          <div className="profile-field">
            <label>Password: </label>
            <input type="password" value={profile.password} onChange={handleInputChange} name="password" />
            {errors.password && <div className="error">{errors.password}</div>}
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
            <label>Username: </label>
            <span>{profile.username}</span>
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
