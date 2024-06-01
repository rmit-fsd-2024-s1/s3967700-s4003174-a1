const db = require("../database/index.js");
const argon2 = require("argon2");

exports.register = async (req, res) => {
  const { FirstName, LastName, Email, Username, Password } = req.body;
  try {
    const passwordHash = await argon2.hash(Password, { type: argon2.argon2id });
    const user = await db.User.create({
      FirstName,
      LastName,
      Email,
      Username,
      Password: passwordHash,
      JoinDate: new Date()
    });
    res.status(201).json({ message: "User registered successfully", user });
  } catch (error) {
    console.error("Registration Error:", error);
    res.status(500).json({ message: "Registration failed", error: error.message });
  }
};

exports.all = async (req, res) => {
  try {
    const users = await db.User.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).send({ message: "Error retrieving users", error: error.message });
  }
};

exports.one = async (req, res) => {
  try {
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
    const user = await db.User.findOne({ where: { Username: username } });
    if (!user) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    const validPassword = await argon2.verify(user.Password, password);
    if (!validPassword) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    // Generate a JWT token here (assuming you have a JWT setup)
    // const token = generateJWT(user);

    // If login is successful, return the user details and token
    res.status(200).json({ message: 'Login successful', user });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.current = async (req, res) => {
  try {
    // Assuming you have user ID stored in req.user from a JWT token
    const user = await db.User.findByPk(req.user.id);
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).send({ message: "Error retrieving current user", error: error.message });
  }
};
