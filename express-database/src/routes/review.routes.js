module.exports = (express, app) => {
  const controller = require('../controllers/item.controller.js');
  const router = express.Router();

  // Create a new item
  router.post('/add-item', controller.create);

  // Retrieve all items
  router.get('/items', controller.findAll);

  // Add routes to server
  app.use('/api', router);
};