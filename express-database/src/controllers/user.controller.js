const jwt = require('jsonwebtoken');
const db = require("../database/index.js");
const argon2 = require("argon2");
const { Op } = require("sequelize");
console.log(Op); 


// Define a simple secret key (this should be stored securely in environment variables!)
const JWT_SECRET = "VerySecretKey123!";

const generateToken = (user) => {
    return jwt.sign(
        {
            userId: user.UserID,
            username: user.Username
        },
        JWT_SECRET,
    );
};

exports.login = async (req, res) => {
  const { username, password } = req.body;

  console.log("Received login request with:", { username, password });  // Debug log

  try {
    const user = await db.user.findOne({ where: { Username: username } });
    if (!user) {
      console.log("No user found with username:", username);  // Debug log
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    const validPassword = await argon2.verify(user.Password, password);
    if (!validPassword) {
      console.log("Password verification failed for user:", username);  // Debug log
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    const token = generateToken(user);
    res.cookie('authToken', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 24 * 60 * 60 * 1000 // 24 hours
    });

    console.log("Login successful for user:", username);  // Debug log
    res.status(200).json({ message: 'Login successful', user });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};



exports.register = async (req, res) => {
  const { FirstName, LastName, Email, Username, Password } = req.body;

  try {
      const existingUser = await db.user.findOne({
          where: {
              [Op.or]: [
                  { Username: Username },
                  { Email: Email }
              ]
          }
      });

      if (existingUser) {
          return res.status(409).json({ message: "Username or email already exists, please choose a different username or email." });
      }

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
      console.error("Registration Error:", error);
      if (error.name === 'SequelizeUniqueConstraintError') {
          return res.status(409).json({ message: "Username or email already exists, please choose a different username or email." });
      }
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


exports.getCurrentUser = (req, res) => {
  const userID = 1;

  db.user.findByPk(userID)
    .then(user => {
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ error: 'User not found' });
      }
    })
    .catch(error => {
      res.status(500).json({ error: error.message });
    });
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

exports.validateSession = async (req, res) => {
  try {
      const token = req.cookies['authToken'];
      if (!token) {
          return res.status(401).json({ message: "No token provided." });
      }

      const decoded = jwt.verify(token, JWT_SECRET);
      const user = await db.user.findByPk(decoded.userId);

      if (!user) {
          return res.status(404).json({ message: "User not found." });
      }

      return res.json({ message: "Session is valid.", user });
  } catch (error) {
      return res.status(500).json({ message: "Failed to authenticate token.", error: error.message });
  }
};



exports.updateProfile = async (req, res) => {
  try {
    const token = req.cookies['authToken'];
    if (!token) {
      return res.status(401).json({ message: "No token provided." });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    const { FirstName, LastName, Username, Email, Bio, Password } = req.body;

    const user = await db.user.findByPk(decoded.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    if (Password) {
      user.Password = await argon2.hash(Password, { type: argon2.argon2id });
    }

    user.FirstName = FirstName;
    user.LastName = LastName;
    user.Username = Username;
    user.Email = Email;
    user.Bio = Bio;

    await user.save();
    return res.json({ message: "Profile updated successfully.", user });
  } catch (error) {
    console.error("Error updating profile:", error);
    return res.status(500).json({ message: "Failed to update profile.", error: error.message });
  }
};

exports.deleteProfile = async (req, res) => {
  try {
    const token = req.cookies['authToken'];
    if (!token) {
      return res.status(401).json({ message: "No token provided." });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await db.user.findByPk(decoded.userId);

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    await user.destroy();
    res.clearCookie('authToken');
    return res.json({ message: "Profile deleted successfully." });
  } catch (error) {
    console.error("Error deleting profile:", error);
    return res.status(500).json({ message: "Failed to delete profile.", error: error.message });
  }
};

