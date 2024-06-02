const db = require("./index.js");
const argon2 = require("argon2");

async function seedData() {
  try {
    await db.sequelize.authenticate();
    console.log("Connection has been established successfully.");
    
    await db.sequelize.sync(); // Ensure the database is in sync without dropping tables

    const userCount = await db.user.count();

    if (userCount > 0) {
      console.log("Users already exist, skipping seeding.");
      return;
    }

    let hash = await argon2.hash("abc123", { type: argon2.argon2id });
    await db.user.create({
      Username: "mbolger",
      Password: hash,
      Email: "mbolger@example.com",
      FirstName: "Matthew",
      LastName: "Bolger",
      JoinDate: new Date(),
      Bio: "My name is Matthew Bolger and this is my bio for my account on SOIL."
    });

    hash = await argon2.hash("def456", { type: argon2.argon2id });
    await db.user.create({
      Username: "shekhar",
      Password: hash,
      Email: "shekhar@example.com",
      FirstName: "Shekhar",
      LastName: "Kalra",
      JoinDate: new Date(),
      Bio: "My name is Shekhar Kalra and this is my bio for my account on SOIL."
    });

    console.log("Seed data has been added successfully.");
  } catch (err) {
    console.error("Unable to seed the database:", err);
  } finally {
    await db.sequelize.close();
    console.log("Database connection closed.");
  }
}

seedData();
