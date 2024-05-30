import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

function Login(props) {
  const [fields, setFields] = useState({ username: "", password: "" });
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFields(prevFields => ({ ...prevFields, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { username, password } = fields;

    try {
      const response = await axios.post('http://localhost:4000/api/users/login', {
        username,
        password
      });

      if (response.data && response.status === 200) {
        props.loginUser(username);  
        navigate("/"); 
      } else {
        setErrorMessage(response.data.message || "Login failed, please try again.");
      }
      
    } catch (error) {
      // Check if server response contains a specific message
      if (error.response && error.response.data.message) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage("Username and/or password invalid, please try again.");
      }
      setFields(prevFields => ({ ...prevFields, password: "" })); // Reset password field
    }
  };

  const handleSignUpClick = () => {
    navigate("/signup");  // Navigate to the signup page
  };

  return (
    <div>
      <h1>Login</h1>
      <hr />
      <form onSubmit={handleSubmit} className="col-md-6">
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            id="username"
            className="form-control"
            value={fields.username}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            className="form-control"
            value={fields.password}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group d-flex justify-content-between">
          <button type="submit" className="btn btn-primary">Login</button>
          <div>
            <span className="mr-2">New User?</span>
            <button onClick={handleSignUpClick} className="btn btn-link">Sign Up</button>
          </div>
        </div>
        {errorMessage && <div className="text-danger">{errorMessage}</div>}
      </form>
    </div>
  );
}

export default Login;

