const express = require("express");
const cors = require('cors');
const bodyParser = require("body-parser");
const db = require('./src/database');

const app = express();

// Middleware.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Routes.
require('./src/routes/user.routes.js')(express, app);
require('./src/routes/item.routes.js')(express, app);
require('./src/routes/payment.routes.js')(express, app);
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
      db.sync();  // Ensure this is properly called
    })
    .catch(err => {
      console.error("Unable to connect to the database:", err);
    });
});

