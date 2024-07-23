'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Vehicle_Type extends Model {
    static associate(models) {
      Vehicle_Type.hasMany(models.Vehicle, {
        foreignKey: 'typeId'
      });
    }
  }
  Vehicle_Type.init({
    title: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Vehicle_Type',
  });
  return Vehicle_Type;
};