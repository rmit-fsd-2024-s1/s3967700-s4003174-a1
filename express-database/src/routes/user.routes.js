module.exports = (express, app) => {
  const controller = require('../controllers/user.controller.js');
  const router = express.Router();

  // Get all users
  router.get("/", controller.all);

  // Get a single user by ID
  router.get("/select/:id", controller.one);

  // Fetch user details
  router.get('/profile/:username', controller.getUserDetails); 

  // Login a user
  router.post("/login", controller.login);

  // Register a new user
  router.post("/register", controller.register);

  // Get the current logged-in user
  router.get("/current/:id", controller.current);

  router.get('/validate-session', controller.validateSession);

  // Add routes to the app
  app.use("/api/users", router);


};
