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
      navigate("/"); // navigate to the home page
    } else {
      setErrorMessage("Username and/or password invalid, please try again.");
      setFields(prevFields => ({ ...prevFields, password: "" })); // Clear password field
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <hr />
      <div className="row">
        <div className="col-md-6">
          <form onSubmit={handleSubmit}>
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
            <button type="submit" className="btn btn-primary">Login</button>
            {errorMessage && <div className="text-danger">{errorMessage}</div>}
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;

