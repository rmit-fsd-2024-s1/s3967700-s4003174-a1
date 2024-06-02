import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./page.css";

function MyProfile() {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [profile, setProfile] = useState({
    FirstName: '',
    LastName: '',
    Username: '',
    Email: '',
    Bio: '',
    JoinDate: ''
  });
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const fetchProfile = useCallback(async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/users/validate-session', {
        withCredentials: true
      });
      if (response.data && response.data.user) {
        setProfile(response.data.user);
      } else {
        throw new Error("Session data incomplete or missing.");
      }
    } catch (error) {
      console.log("Session validation error:", error);
      alert('Please log in to view profile.');
      navigate('/login');
    }
  }, [navigate]);

  useEffect(() => {
    fetchProfile();
  }, [navigate, fetchProfile]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!profile.FirstName) newErrors.FirstName = "First name is required.";
    if (!profile.LastName) newErrors.LastName = "Last name is required.";
    if (!profile.Username) newErrors.Username = "Username is required.";
    if (!profile.Email) newErrors.Email = "Email is required.";
    if (!/^\S+@\S+\.\S+$/.test(profile.Email)) newErrors.Email = "Invalid email format.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validatePassword = () => {
    const newErrors = {};
    if (!password) newErrors.Password = "Password is required.";
    if (password && !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(password))
      newErrors.Password = "Password must be at least 8 characters long, include an uppercase letter, a lowercase letter, and a number.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleEdit = () => {
    setIsEditing(true);
    setErrors({});
  };

  const handleChangePassword = () => {
    setIsChangingPassword(true);
    setErrors({});
  };

  const handleCancel = () => {
    setIsEditing(false);
    setIsChangingPassword(false);
    fetchProfile(); // Re-fetch the profile to reset any unsaved changes
  };

  const handleSave = async () => {
    if (!validateForm()) return;

    try {
      await axios.put('http://localhost:4000/api/users/update', profile, { withCredentials: true });
      setIsEditing(false);
      alert('Profile updated successfully.');
    } catch (error) {
      console.error("Error updating profile:", error);
      alert('Error updating profile, please try again.');
    }
  };

  const handleSavePassword = async () => {
    if (!validatePassword()) return;

    try {
      await axios.put('http://localhost:4000/api/users/update-password', { Password: password }, { withCredentials: true });
      setIsChangingPassword(false);
      alert('Password updated successfully.');
    } catch (error) {
      console.error("Error updating password:", error);
      alert('Error updating password, please try again.');
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete your profile? This action cannot be undone.')) {
      try {
        await axios.delete('http://localhost:4000/api/users/delete', { withCredentials: true });
        alert('Profile deleted successfully.');
        navigate('/login');
      } catch (error) {
        console.error("Error deleting profile:", error);
        alert('Error deleting profile, please try again.');
      }
    }
  };

  return (
    <div className="profile-container">
      <h1>My Profile</h1>
      <hr />
      {isEditing ? (
        <div>
          <div className="profile-field">
            <label>First Name: </label>
            <input type="text" value={profile.FirstName} onChange={handleInputChange} name="FirstName" />
            {errors.FirstName && <div className="error">{errors.FirstName}</div>}
          </div>
          <div className="profile-field">
            <label>Last Name: </label>
            <input type="text" value={profile.LastName} onChange={handleInputChange} name="LastName" />
            {errors.LastName && <div className="error">{errors.LastName}</div>}
          </div>
          <div className="profile-field">
            <label>Username: </label>
            <input type="text" value={profile.Username} onChange={handleInputChange} name="Username" />
            {errors.Username && <div className="error">{errors.Username}</div>}
          </div>
          <div className="profile-field">
            <label>Email: </label>
            <input type="email" value={profile.Email} onChange={handleInputChange} name="Email" />
            {errors.Email && <div className="error">{errors.Email}</div>}
          </div>
          <div className="profile-field">
            <label>Bio: </label>
            <textarea value={profile.Bio} onChange={handleInputChange} name="Bio"></textarea>
          </div>
          <button onClick={handleSave} className="btn btn-success">Save</button>
          <button onClick={handleCancel} className="btn btn-secondary">Cancel</button>
        </div>
      ) : isChangingPassword ? (
        <div>
          <div className="profile-field">
            <label>New Password: </label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} name="Password" />
            {errors.Password && <div className="error">{errors.Password}</div>}
          </div>
          <button onClick={handleSavePassword} className="btn btn-success">Save Password</button>
          <button onClick={handleCancel} className="btn btn-secondary">Cancel</button>
        </div>
      ) : (
        <div>
          <div className="profile-field">
            <label style={{ marginRight: '10px' }}>First Name: </label>
            <span>{profile.FirstName}</span>
          </div>
          <div className="profile-field">
            <label style={{ marginRight: '10px' }}>Last Name: </label>
            <span>{profile.LastName}</span>
          </div>
          <div className="profile-field">
            <label style={{ marginRight: '10px' }}>Username: </label>
            <span>{profile.Username}</span>
          </div>
          <div className="profile-field">
            <label style={{ marginRight: '10px' }}>Email: </label>
            <span>{profile.Email}</span>
          </div>
          <div className="profile-field">
            <label style={{ marginRight: '10px' }}>Bio: </label>
            <span>{profile.Bio || 'No bio provided'}</span>
          </div>
          <div className="profile-field">
            <label style={{ marginRight: '10px' }}>Joined: </label>
            <span>{new Date(profile.JoinDate).toLocaleDateString()}</span>
          </div>
          <button onClick={handleEdit} className="btn btn-primary">Edit</button>
          <button onClick={handleChangePassword} className="btn btn-warning">Change Password</button>
          <button onClick={handleDelete} className="btn btn-danger">Delete</button>
        </div>
      )}
    </div>
  );
}

export default MyProfile;
