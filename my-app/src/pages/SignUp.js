import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { saveUser } from "../data/repository";

function SignUp(props) {
  const [fields, setFields] = useState({
    username: "",
    password: "",
    confirmPassword: "",  
    name: "",
    email: ""
  });
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFields(fields => ({ ...fields, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!fields.email.match(/\S+@\S+\.\S+/)) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    if (!fields.password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)) {
      setErrorMessage("Password must be at least 8 characters long, include an uppercase letter, a lowercase letter, and a number.");
      return;
    }

    if (fields.password !== fields.confirmPassword) {
      setErrorMessage("Passwords don't match.");
      return;
    }

    const newUser = {
      name: fields.name,
      email: fields.email,
      username: fields.username,
      password: fields.password,
    };

    const success = saveUser(newUser);
    if (success) {
      props.loginUser(fields.username); 
      navigate("/"); 
    } else {
      setErrorMessage("Registration failed, username may already exist or fields are invalid.");
    }
  };

  const handleLoginClick = () => {
    navigate("/login"); // Navigate to the login page
  };

  return (
    <div>
      <h1>Sign Up</h1>
      <hr />
      <div className="row">
        <div className="col-md-12">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input type="text" name="name" id="name" className="form-control"
                value={fields.name} onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" name="email" id="email" className="form-control"
                value={fields.email} onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input type="text" name="username" id="username" className="form-control"
                value={fields.username} onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password" name="password" id="password" className="form-control"
                value={fields.password} onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input type="password" name="confirmPassword" id="confirmPassword" className="form-control"
                value={fields.confirmPassword} onChange={handleInputChange} />
            </div>
            <div className="form-group d-flex justify-content-between align-items-center">
              <button type="submit" className="btn btn-primary">Sign Up</button>
              <div>
                <span className="mr-2">Already registered?</span>
                <button onClick={handleLoginClick} className="btn btn-link">Login</button>
              </div>
            </div>
            {errorMessage && <div className="text-danger">{errorMessage}</div>}
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
