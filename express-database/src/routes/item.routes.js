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

  const bcrypt = require('bcryptjs');
const { User } = require('../models'); // Adjust the path as necessary.

exports.login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ where: { username } });
    if (user && await bcrypt.compare(password, user.password)) {
      res.json({ message: 'Login successful', user });
    } else {
      res.status(401).json({ message: 'Login failed' });
    }
  } catch (error) {
    res.status(500).json({ message: 'An error occurred', error });
  }
};

exports.create = async (req, res) => {
  const { username, email, password, name } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
      name
    });
    res.status(201).json({ message: 'User registered successfully', userID: newUser.id });
  } catch (error) {
    res.status(500).json({ message: 'Registration failed', error });
  }
};
