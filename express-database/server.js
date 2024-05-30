const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors"); // Include the CORS library
const db = require("./src/database/index.js");

const app = express();

// CORS Middleware to allow cross-origin requests
app.use(cors({
  origin: true, // reflect the request origin, as defined by 'req.header('Origin')'
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow only these methods from CORS
  credentials: true, // Allow cookies
}));


// Replace bodyParser with express.json and express.urlencoded as bodyParser is deprecated
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes.
require("./src/routes/user.routes.js")(express, app);
require("./src/routes/item.routes.js")(express, app);
require("./src/routes/review.routes.js")(express, app);
require("./src/routes/specials.routes.js")(express, app);

// Root route.
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the application." });
});

// Start the server.
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
  
  // Database connection and synchronization
  db.sequelize.authenticate()
    .then(() => {
      console.log("Connection has been established successfully.");
      // If you need to sync models (not recommended in production automatically)
      // db.sequelize.sync();
    })
    .catch(err => {
      console.error("Unable to connect to the database:", err);
    });
});
