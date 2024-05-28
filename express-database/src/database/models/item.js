module.exports = (sequelize, DataTypes) => {
    sequelize.define('Item', {
      itemID: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      itemName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
      }
    });
  };