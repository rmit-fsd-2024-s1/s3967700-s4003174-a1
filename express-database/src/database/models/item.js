module.exports = (sequelize, DataTypes) => {
    const Item = sequelize.define('Item', {
      itemID: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      itemName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      Quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
      }
    });
    return Item;
  };