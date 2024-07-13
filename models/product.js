'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Product extends Model {
    static associate(models) {
      Product.belongsTo(models.Brand, {
        foreignKey: 'brandId'
      });
    }
  }
  Product.init({
    name: DataTypes.STRING,
    price: DataTypes.DECIMAL(10, 2),
    upc12: DataTypes.BIGINT,
    brandId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Brand',
        key: 'id'
      }
    },
    deletedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Product',
    tableName: 'products',
    timestamps: true,
    paranoid: true
  });
  return Product;
};
