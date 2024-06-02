import React from "react";
import ReactDOM from "react-dom";
import axios from 'axios'; // Ensure axios is imported here
import "./index.css";
import { initUsers } from "./data/repository";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

// Set withCredentials to true for all axios requests
axios.defaults.withCredentials = true;

// Initialise local storage data.
initUsers();

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
