module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    userID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: True,
      unique: true,
    },
    firstName: { 
      type: DataTypes.STRING,
      allowNull: false, 
    },
    lastName: { 
      type: DataTypes.STRING,
      allowNull: false, 
    }
  }, {
    tableName: 'users',
    timestamps: true 
  });

  return User;
};
