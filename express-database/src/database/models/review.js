module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define('Review', {
    ReviewID: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    UserID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'User',
        key: 'UserID'
      }
    },
    ItemID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Item',
        key: 'ItemID'
      }
    },
    ReviewTitle: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    Rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
        max: 5
      }
    },
    ReviewText: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    dateCreated: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    }
  }, {
    timestamps: false // No createdAt and updatedAt fields
  });

  return Review;
};
