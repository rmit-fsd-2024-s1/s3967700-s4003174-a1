// src/database/models/user.js
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    UserID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    Password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Email: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
    },
    FirstName: { 
      type: DataTypes.STRING,
      allowNull: false, 
    },
    LastName: { 
      type: DataTypes.STRING,
      allowNull: false, 
    },
    JoinDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  }, {
    tableName: 'User',
    timestamps: false,
  });

  return User;
};
