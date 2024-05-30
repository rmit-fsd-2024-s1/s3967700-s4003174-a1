const db = require("../database");
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
  const user = await db.user.findOne({ where: { username } });
  if (user && await argon2.verify(user.password_hash, password)) {
    res.json({ message: 'Login successful', user });
  } else {
    res.status(401).json({ message: 'Invalid username or password' });
  }
};



exports.create = async (req, res) => {
  try {
    const existingUser = await db.user.findOne({ where: { username: req.body.username } });
    if (existingUser) {
      return res.status(409).send({ message: "Username already exists" });
    }

    const hash = await argon2.hash(req.body.password, { type: argon2.argon2id });
    const newUser = await db.user.create({
      username: req.body.username,
      password_hash: hash,
      email: req.body.email,
      firstName: req.body.firstName, 
      lastName: req.body.lastName
    });

    res.status(201).json({ message: "User created successfully", user: newUser });
  } catch (error) {
    res.status(500).send({ message: "Failed to create user", error: error.message });
  }
};
