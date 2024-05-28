module.exports = (sequelize, DataTypes) => {
    const OrderItem = sequelize.define('OrderItem', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      orderID: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Order',
          key: 'id'
        },
        allowNull: false
      },
      itemID: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Item',
          key: 'id'
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