module.exports = (express, app) => {
  const controller = require("../controllers/user.controller.js");
  const router = express.Router();



  // Select all users.
  router.get("/", controller.all);

  // Select a single user with id.
  router.get("/select/:id", controller.one);

  // Login a user. Changed to POST for security.
  router.post("/login", controller.login);
  
  // Register route
  router.post("/register", controller.register);
  
  app.use("/api/users", router);

};
  

