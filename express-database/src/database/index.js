const { Sequelize, DataTypes } = require("sequelize");
const config = require("./config.js");
const argon2 = require("argon2");

const db = {
  Op: Sequelize.Op
};

// Create Sequelize instance.
db.sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
  host: config.HOST,
  dialect: config.DIALECT
});

// Include models.
db.user = require("./models/user.js")(db.sequelize, DataTypes);
db.item = require("./models/item.js")(db.sequelize, DataTypes);
db.order = require("./models/order.js")(db.sequelize, DataTypes);


// Relate review and user.
db.review.belongsTo(db.user, { foreignKey: { name: "userID", allowNull: false } });
db.review.belongsTo(db.item, { foreignKey: { name: "itemID", allowNull: false } });
db.order.belongsTo(db.user, { foreignKey: { name: "userID", allowNull: false } });
db.orderItem.belongsTo(db.order, { foreignKey: { name: "orderID", allowNull: false } });
db.orderItem.belongsTo(db.item, { foreignKey: { name: "itemID", allowNull: false } });
db.orderItem = require("./models/orderItems.js")(db.sequelize, DataTypes);
db.review = require("./models/review.js")(db.sequelize, DataTypes);
db.specials = require("./models/specials.js")(db.sequelize, DataTypes);

// Define relationships.
db.orderItem.belongsTo(db.order, { foreignKey: { name: "OrderID", allowNull: false } });
db.orderItem.belongsTo(db.item, { foreignKey: { name: "ItemID", allowNull: false } });
db.review.belongsTo(db.user, { foreignKey: { name: "UserID", allowNull: false } });
db.review.belongsTo(db.item, { foreignKey: { name: "ItemID", allowNull: false } });

// Sync the database.
db.sync = async () => {
  await db.sequelize.sync();
  await seedData();
};

async function seedData() {
  const count = await db.user.count();
  if (count > 0) return;  // Prevent re-seeding

  let hash = await argon2.hash("abc123", { type: argon2.argon2id });
  await db.user.create({ username: "mbolger", password_hash: hash, first_name: "Matthew", last_name: "Bolger" });

  hash = await argon2.hash("def456", { type: argon2.argon2id });
  await db.user.create({ username: "shekhar", password_hash: hash, first_name: "Shekhar", last_name: "Kalra" });
}


module.exports = db;
