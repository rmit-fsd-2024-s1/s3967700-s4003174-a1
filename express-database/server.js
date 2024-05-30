const express = require("express");
const bodyParser = require("body-parser");
const db = require("./src/database/index.js");

const app = express();

// Middleware.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes.
require("./src/routes/user.routes.js")(express, app);
require("./src/routes/item.routes.js")(express, app);
require("./src/routes/review.routes.js")(express, app); // Ensure this line is correct
require("./src/routes/specials.routes.js")(express, app);

// Root route.
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the application." });
});

// Start the server.
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
  
  db.sequelize.authenticate()
    .then(() => {
      console.log("Connection has been established successfully.");
      return db.sync();
    })
    .then(() => {
      console.log("Database synchronization complete.");
    })
    .catch(err => {
      console.error("Unable to connect to the database:", err);
    });
});
