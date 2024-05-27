module.exports = (sequelize, DataTypes) =>
  sequelize.define("user", {
    userID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    first_name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    last_name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(256),
      allowNull: true,
      unique: true
    },
    username: {
      type: DataTypes.STRING(256),
      allowNull: false,
      unique: true
    },
    password_hash: {
      type: DataTypes.STRING(256),
      allowNull: false
    },
  }, {
    // Don't add the timestamp attributes (updatedAt, createdAt).
    timestamps: false
  });
