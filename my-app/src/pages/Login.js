import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { verifyUser } from "../data/repository";

function Login(props) {
  const [fields, setFields] = useState({ username: "", password: "" });
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFields(prevFields => ({ ...prevFields, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const { username, password } = fields;
    const verified = verifyUser(username, password);

    if (verified) {
      props.loginUser(username);  
      navigate("/"); // Navigate to the home page after login
    } else {
      setErrorMessage("Username and/or password invalid, please try again.");
      setFields(prevFields => ({ ...prevFields, password: "" })); // Clear password field after failed login
    }
  };

  const handleSignUpClick = () => {
    navigate("/signup"); // Navigate to the sign-up page
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
