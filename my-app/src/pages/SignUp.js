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

  const emailRegex = /\S+@\S+\.\S+/;
  
  const isStrongPassword = (password) => {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(password);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFields(fields => ({ ...fields, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!emailRegex.test(fields.email)) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    if (!isStrongPassword(fields.password)) {
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
      setFields({ username: "", password: "", confirmPassword: "", name: "", email: "" });
      setErrorMessage("Registration failed, username may already exist or fields are invalid.");
    }
  };

  return (
    <div>
      <h1>Sign Up</h1>
      <hr />
      <div className="row">
        <div className="col-md-6">
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
            <div className="form-group">
              <input type="submit" className="btn btn-primary" value="Sign Up" />
            </div>
            {errorMessage &&
              <div className="form-group">
                <span className="text-danger">{errorMessage}</span>
              </div>
            }
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
