const { Sequelize, DataTypes } = require("sequelize");
const config = require("./config.js");
const argon2 = require("argon2");

const db = {
  Op: Sequelize.Op
};

// Create Sequelize instance
db.sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
  host: config.HOST,
  dialect: config.DIALECT
});

// Include models
db.user = require("./models/user.js")(db.sequelize, DataTypes);
db.item = require("./models/item.js")(db.sequelize, DataTypes);
db.payment = require("./models/payment.js")(db.sequelize, DataTypes);
db.review = require("./models/review.js")(db.sequelize, DataTypes);
db.specials = require("./models/specials.js")(db.sequelize, DataTypes);
db.cart = require("./models/cart.js")(db.sequelize, DataTypes);

// Manually define associations
db.review.belongsTo(db.user, { foreignKey: { name: "UserID", allowNull: false } });
db.review.belongsTo(db.item, { foreignKey: { name: "ItemID", allowNull: false } });
db.cart.belongsTo(db.item, { foreignKey: { name: "itemID", allowNull: false }, as: 'Item' });
db.payment.belongsTo(db.user, { foreignKey: { name: "userID", allowNull: false } });

// Define associations directly
db.cart.hasMany(db.payment, { as: 'payments', foreignKey: 'cartID' });
db.payment.belongsTo(db.cart, { as: 'cart', foreignKey: 'cartID' });

// Sync the database.
db.sync = async () => {
  await db.sequelize.sync();
  await seedData();
};

async function seedData() {
  const count = await db.user.count();

  if (count > 0) return;

  let hash = await argon2.hash("abc123", { type: argon2.argon2id });
  await db.user.create({
    Username: "mbolger",
    Password: hash,
    Email: "mbolger@example.com",
    FirstName: "Matthew",
    LastName: "Bolger",
    JoinDate: new Date()
  });

  hash = await argon2.hash("def456", { type: argon2.argon2id });
  await db.user.create({
    Username: "shekhar",
    Password: hash,
    Email: "shekhar@example.com",
    FirstName: "Shekhar",
    LastName: "Kalra",
    JoinDate: new Date()
  });
}

// Sync the database
db.sync();

module.exports = db;
