module.exports = (sequelize, DataTypes) => {
  const Cart = sequelize.define('Cart', {
    cartID: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userID: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    itemID: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    }
  }, {
    tableName: 'Cart',
    timestamps: true,
  });

  return Cart;
};
