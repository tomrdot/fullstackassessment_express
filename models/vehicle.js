'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Vehicle extends Model {
    static associate(models) {
      Vehicle.belongsTo(models.Vehicle_Type, {
        foreignKey: 'id'
      });
    }
  }
  Vehicle.init({
    dvid: DataTypes.STRING,
    lockStatus: DataTypes.STRING,
    currentSpeedInKm: DataTypes.DECIMAL,
    batteryLevel: DataTypes.INTEGER,
    status: DataTypes.STRING,
    location: DataTypes.STRING,
    typeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Vehicle_Type',
        key: 'id'
      }
    },
    deletedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Vehicle',
    tableName: 'Vehicles',
    timestamps: true,
    paranoid: true
  });
  return Vehicle;
};
