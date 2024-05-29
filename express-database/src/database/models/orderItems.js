module.exports = (sequelize, DataTypes) => {
  const OrderItem = sequelize.define('OrderItem', {
    orderItemID: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    orderID: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Order',
        key: 'OrderID'
      },
      allowNull: false
    },
    itemID: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Item',
        key: 'ItemID'
      },
      allowNull: false
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
    }
  });
  return OrderItem;
};