module.exports = (sequelize, DataTypes) => {
  const Specials = sequelize.define('Specials', {
    SpecialID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    SpecialName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    Price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    Discount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    DayOfWeek: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  }, {
    tableName: 'Specials',
    timestamps: false,
  });

  return Specials;
};
