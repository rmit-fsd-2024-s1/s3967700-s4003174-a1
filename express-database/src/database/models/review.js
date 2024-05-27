module.exports = (sequelize, DataTypes) =>
  sequelize.define("review", {
    ReviewID: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    UserID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      foreignKey: true
    },
    ItemID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      foreignKey: true
    }
  }, {
    // Don't add the timestamp attributes (updatedAt, createdAt).
    timestamps: false
  });
