'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Catering extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Catering.hasMany(models.Checkout,{
        foreignKey: 'VendorId',
        sourceKey: 'id'
      })
      Catering.hasMany(models.Photo, {
        foreignKey: 'vendor_id',
        sourceKey: 'id'
      })
    }
  };
  Catering.init({
    name: DataTypes.STRING,
    address: DataTypes.STRING,
    email: DataTypes.STRING,
    phone_number: DataTypes.STRING,
    photos: DataTypes.STRING,
    price: DataTypes.INTEGER,
    description: DataTypes.STRING,
    avatar: DataTypes.STRING,
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Catering',
  });
  return Catering;
};