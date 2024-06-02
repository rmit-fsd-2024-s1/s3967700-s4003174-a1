// In your cart model file
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
      allowNull: true, // Make this nullable if it can be either item or special
    },
    specialID: {
      type: DataTypes.INTEGER,
      allowNull: true, // Make this nullable if it can be either item or special
    },
    itemName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false
    }
  }, {
    tableName: 'Cart',
    timestamps: false,
  });

  return Cart;
};


