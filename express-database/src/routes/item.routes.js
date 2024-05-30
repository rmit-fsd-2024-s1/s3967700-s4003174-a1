module.exports = (express, app) => {
    const controller = require("../controllers/item.controller.js");
    const router = express.Router();
  
    // Select all items.
    router.get("/", controller.findAll);
  
    // Create a new item.
    router.post("/", controller.create);
  
    // Add routes to server
    app.use('/api/items', router);
  };
