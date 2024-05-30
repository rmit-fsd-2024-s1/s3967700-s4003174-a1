const db = require("../database"); // Ensure this path is correct
// src/controllers/user.controller.js
const db = require("../database/index.js");
const argon2 = require("argon2");

// Make sure that you're accessing the correct model from db object.
// It's important that the model name matches exactly what's exported from your Sequelize setup.
exports.register = async (req, res) => {
  const { FirstName, LastName, Email, Username, Password } = req.body;
  try {
    const passwordHash = await argon2.hash(Password, { type: argon2.argon2id });
    // Assuming the exported model name from db object is 'User'
    const user = await db.User.create({
      FirstName,
      LastName,
      Email,
      Username,
      Password: passwordHash,
      JoinDate: new Date()  // This assumes your User model has a 'JoinDate' field
    });
    res.status(201).json({ message: "User registered successfully", user });
  } catch (error) {
    console.error("Registration Error:", error);
    res.status(500).json({ message: "Registration failed", error: error.message });
  }
};

exports.all = async (req, res) => {
  try {
    // Use consistent naming: If it's `User` in other places, it should be `User` here too.
    const users = await db.User.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).send({ message: "Error retrieving users", error: error.message });
  }
};

exports.one = async (req, res) => {
  try {
    // Consistent model access
    const user = await db.User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).send({ message: "Error retrieving user", error: error.message });
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find the user by username
    const user = await db.user.findOne({ where: { Username: username } });

    if (!user) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    // Verify the password using Argon2
    const validPassword = await argon2.verify(user.Password, password);
    if (!validPassword) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    // If login is successful, return the user details
    res.status(200).json({ message: 'Login successful', user: user });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.create = async (req, res) => {
  try {
    const existingUser = await db.user.findOne({ where: { Username: req.body.username } });
    if (existingUser) {
      return res.status(409).send({ message: "Username already exists" });
    }

    // Hash the password using Argon2
    const hashedPassword = await argon2.hash(req.body.password);

    const newUser = await db.user.create({
      Username: req.body.username,
      Password: hashedPassword,
      Email: req.body.email,
      FirstName: req.body.firstName, 
      LastName: req.body.lastName,
      JoinDate: new Date()
    });

    res.status(201).json({ message: "User created successfully", user: newUser });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Error logging in", error: error.message });
  }
};

// Removed duplicate 'create' method to keep DRY (Don't Repeat Yourself) principles.
