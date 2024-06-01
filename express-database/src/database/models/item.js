module.exports = (sequelize, DataTypes) => {
  const Item = sequelize.define('Item', {
    ItemID: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    ItemName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Price: {
      type: DataTypes.FLOAT,
      allowNull: false
    }
  }, {
    tableName: 'Item',
    timestamps: false
  });

  return Item;
};

  

  