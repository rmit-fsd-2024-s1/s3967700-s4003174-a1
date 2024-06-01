module.exports = (express, app) => {
  const controller = require("../controllers/specials.controller.js");
  const router = express.Router();

  // Select all specials.
  router.get("/", controller.findAll);

  // Add routes to server.
  app.use('/api/specials', router);
};
