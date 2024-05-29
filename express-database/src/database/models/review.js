module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define('Review', {
    reviewID: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    userID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'User',
        key: 'userID'
      }
    },
    itemID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Item',
        key: 'itemID'
      }
    },
    reviewText: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    timestamps: false
  });
  return Review;
};