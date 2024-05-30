// src/controllers/user.controller.js
const db = require("../database/index.js");
const argon2 = require("argon2");

exports.all = async (req, res) => {
  try {
    const users = await db.user.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).send({ message: "Error retrieving users", error: error.message });
  }
};

exports.one = async (req, res) => {
  try {
    const user = await db.user.findByPk(req.params.id);
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
    res.status(500).send({ message: "Failed to create user", error: error.message });
  }
};
