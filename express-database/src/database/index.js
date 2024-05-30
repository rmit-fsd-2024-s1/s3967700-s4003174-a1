const { Sequelize, DataTypes } = require("sequelize");
const config = require("./config.js");

// Create Sequelize instance
db.sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
  host: config.HOST,
  dialect: config.DIALECT
});

// Include models
db.user = require("./models/user.js")(db.sequelize, DataTypes);
db.item = require("./models/item.js")(db.sequelize, DataTypes);
db.order = require("./models/order.js")(db.sequelize, DataTypes);
db.orderItem = require("./models/orderItems.js")(db.sequelize, DataTypes);
db.review = require("./models/review.js")(db.sequelize, DataTypes);
db.specials = require("./models/specials.js")(db.sequelize, DataTypes);

// Define associations
db.order.belongsTo(db.user, { foreignKey: { name: "UserID", allowNull: false } });
db.orderItem.belongsTo(db.order, { foreignKey: { name: "orderID", allowNull: false } });
db.orderItem.belongsTo(db.item, { foreignKey: { name: "itemID", allowNull: false } });
db.review.belongsTo(db.user, { foreignKey: { name: "UserID", allowNull: false } });
db.review.belongsTo(db.item, { foreignKey: { name: "ItemID", allowNull: false } });

// Synchronize models with the database
db.sync = async () => {
  await db.sequelize.sync();
};

module.exports = db;
