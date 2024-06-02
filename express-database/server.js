const express = require("express");
const cors = require('cors');
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const db = require('./src/database');

const app = express();

// CORS options
const corsOptions = {
  origin: 'http://localhost:3000', // This should match the URL of your frontend application
  credentials: true, // Allows cookies to be sent with requests
  optionsSuccessStatus: 200 // Some legacy browsers choke on status 204
};

// Middleware.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors(corsOptions)); // Use CORS options defined above
app.use(cookieParser());

// Routes.
require('./src/routes/user.routes.js')(express, app);
require('./src/routes/item.routes.js')(express, app);
require('./src/routes/order.routes.js')(express, app);
require('./src/routes/orderItems.routes.js')(express, app);
require('./src/routes/specials.routes.js')(express, app);
require('./src/routes/cart.routes.js')(express, app);

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
      // If you need to sync models (comment out if not needed)
      // db.sequelize.sync();
    })
    .catch(err => {
      console.error("Unable to connect to the database:", err);
    });
});
