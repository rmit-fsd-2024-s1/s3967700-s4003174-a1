const db = require("../database/index.js");
const argon2 = require("argon2");

exports.register = async (req, res) => {
  const { FirstName, LastName, Email, Username, Password } = req.body;

  try {
    // Check if username or email already exists
    const existingUser = await db.user.findOne({
      where: {
        [db.Sequelize.Op.or]: [
          { Username: Username },
          { Email: Email }
        ]
      }
    });
    
    if (existingUser) {
      console.log("Existing user found:", existingUser);
      return res.status(409).json({ message: "Username or email already exists, please choose a different username or email." });
    } else {
      console.log("No existing user found, proceeding to create new user.");
    }
    

    // Hash the password and create the user if the username and email are unique
    const passwordHash = await argon2.hash(Password, { type: argon2.argon2id });
    const user = await db.user.create({
      FirstName,
      LastName,
      Email,
      Username,
      Password: passwordHash,
      JoinDate: new Date()
    });

    res.status(201).json({ message: "User registered successfully", user });
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      res.status(409).json({ message: "Username or email already exists, please choose a different username or email." });
    } else {
      console.error("Registration Error:", error);
      res.status(500).json({ message: "Registration failed", error: error.message });
    }
    console.error("Registration Error:", error);
    res.status(500).json({ message: "Registration failed", error: error.message });
  }
  
};


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
    const user = await db.user.findOne({ where: { Username: username } });
    if (!user) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    const validPassword = await argon2.verify(user.Password, password);
    if (!validPassword) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    res.status(200).json({ message: 'Login successful', user });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.current = async (req, res) => {
  try {
    const user = await db.user.findByPk(req.params.id);
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).send({ message: "Error retrieving current user", error: error.message });
  }
};


exports.getUserDetails = async (req, res) => {
  try {
      // Assuming req.params.username is the way to access the username sent from frontend
      const user = await db.user.findOne({ where: { Username: req.params.username } });
      if (!user) {
          return res.status(404).json({ message: "User not found" });
      }
      res.json(user); // Send back the user data
  } catch (error) {
      res.status(500).json({ message: "Error retrieving user", error: error.message });
  }
};
