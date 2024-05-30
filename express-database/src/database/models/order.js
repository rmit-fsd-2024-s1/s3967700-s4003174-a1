module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
    OrderID: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    userID: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    totalAmount: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    orderDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    }
  }, {
    tableName: 'Order',
  });
  return Order;
};