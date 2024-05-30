import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

function SignUp(props) {
    const [fields, setFields] = useState({
        username: "",
        password: "",
        confirmPassword: "",
        firstName: "",
        lastName: "",
        email: ""
    });
    const [errorMessage, setErrorMessage] = useState(null);
    const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
    const navigate = useNavigate();

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFields(fields => ({ ...fields, [name]: value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        // Validate email format
        if (!fields.email.match(/\S+@\S+\.\S+/)) {
            setErrorMessage("Please enter a valid email address.");
            return;
        }

        // Validate password strength
        if (!fields.password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)) {
            setErrorMessage("Password must be at least 8 characters long, include an uppercase letter, a lowercase letter, and a number.");
            return;
        }

        // Check if passwords match
        if (fields.password !== fields.confirmPassword) {
            setErrorMessage("Passwords don't match.");
            return;
        }

        const newUser = {
          FirstName: fields.firstName,
          LastName: fields.lastName,
          Email: fields.email,
          Username: fields.username,
          Password: fields.password,
      };
      

        try {
            const response = await axios.post('http://localhost:4000/api/users/register', newUser);
            if (response.data) {
                navigate("/"); // Navigate to the home page after successful sign up
            }
        } catch (error) {
            console.log(error.response); // Log the error response to understand what went wrong
            if (error.response && error.response.data.error) {
                setErrorMessage(error.response.data.error);
            } else {
                setErrorMessage("Registration failed, please try again.");
            }
            console.error("Registration Error:", error);
        }
        try {
          console.log("Attempting to register:", newUser);
          const response = await axios.post('http://localhost:4000/api/users/register', newUser);
          console.log("Registration response:", response.data);
          navigate("/"); // Navigate to the home page after successful sign up
      } catch (error) {
          console.log("Error response:", error.response); // Detailed log of the error response
          if (error.response && error.response.data.error) {
              setErrorMessage(error.response.data.error);
          } else {
              setErrorMessage("Registration failed, please try again.");
          }
      }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword); // Toggle the state of the password visibility
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
                            <label htmlFor="firstName">First Name</label>
                            <input type="text" name="firstName" id="firstName" className="form-control"
                                value={fields.firstName} onChange={handleInputChange} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="lastName">Last Name</label>
                            <input type="text" name="lastName" id="lastName" className="form-control"
                                value={fields.lastName} onChange={handleInputChange} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input type="email" name="email" id="email" className="form-control"
                                value={fields.email} onChange={handleInputChange} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="username">Username</label>
                            <input type="text" name="username" id="username" className="form-control"
                                value={fields.username} onChange={handleInputChange} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input type={showPassword ? "text" : "password"} name="password" id="password" className="form-control"
                                value={fields.password} onChange={handleInputChange} required />
                            <button type="button" onClick={togglePasswordVisibility} className="btn btn-secondary btn-sm">
                                {showPassword ? "Hide" : "Show"} Password
                            </button>
                        </div>
                        <div className="form-group">
                            <label htmlFor="confirmPassword">Confirm Password</label>
                            <input type={showPassword ? "text" : "password"} name="confirmPassword" id="confirmPassword" className="form-control"
                                value={fields.confirmPassword} onChange={handleInputChange} required />
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
