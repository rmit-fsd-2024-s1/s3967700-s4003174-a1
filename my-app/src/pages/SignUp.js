import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// Assuming this function now saves the user to local storage and returns true if successful.
import { saveUser } from "../data/repository";

function SignUp(props) {
  const [fields, setFields] = useState({ username: "", password: "", name: "", email: "" });
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFields(fields => ({ ...fields, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Save the user to local storage or verify against existing users
    const success = saveUser(fields.username, fields.password, fields.name, fields.email);

    if(success) {

      props.loginUser(fields.username);

      // Navigate to the home page after successful registration.
      navigate("/");
    } else {
      // If registration fail
      setFields({ username: "", password: "", name: "", email: "" });
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
              <label htmlFor="name" className="control-label">Name</label>
              <input type="text" name="name" id="name" className="form-control"
                value={fields.name} onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <label htmlFor="email" className="control-label">Email</label>
              <input type="email" name="email" id="email" className="form-control"
                value={fields.email} onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <label htmlFor="username" className="control-label">Username</label>
              <input type="text" name="username" id="username" className="form-control"
                value={fields.username} onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <label htmlFor="password" className="control-label">Password</label>
              <input type="password" name="password" id="password" className="form-control"
                value={fields.password} onChange={handleInputChange} />
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
