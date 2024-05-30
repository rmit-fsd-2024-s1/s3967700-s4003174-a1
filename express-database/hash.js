const argon2 = require('argon2');

async function hashPassword(plaintextPassword) {
  try {
    const hash = await argon2.hash(plaintextPassword);
    console.log("Hashed password:", hash);
  } catch (err) {
    console.error("Error hashing password:", err);
  }
}

hashPassword("abc123");