const express = require("express");
const cors = require('cors');
const bodyParser = require("body-parser");
const db = require("./src/database/index.js");

const app = express();

// Middleware.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Routes.
require('./routes/user.routes.js')(express, app);
require('./routes/item.routes.js')(express, app);
require('./routes/order.routes.js')(express, app);
require('./routes/orderItems.routes.js')(express, app);
require('./routes/specials.routes.js')(express, app);
require('./routes/cart.routes.js')(express, app);

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
