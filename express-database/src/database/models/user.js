module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    userID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
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
    timestamps: true,
    createdAt: 'joinDate'
  });
  return User;
};