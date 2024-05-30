const db = require("../database"); // Ensure this path is correct
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
    const user = await db.User.findOne({ where: { Username: username } }); // Use the correct field name as per model definition
    if (user && await argon2.verify(user.Password, password)) {  // Make sure you're verifying the correct field
      res.json({ message: 'Login successful', user });
    } else {
      res.status(401).json({ message: 'Invalid username or password' });
    }
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Error logging in", error: error.message });
  }
};

// Removed duplicate 'create' method to keep DRY (Don't Repeat Yourself) principles.
