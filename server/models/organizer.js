'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Organizer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Organizer.hasMany(models.Checkout,{
        foreignKey: 'VendorId',
        sourceKey: 'id'
      })
      Organizer.hasMany(models.Photo, {
        foreignKey: 'vendor_id',
        sourceKey: 'id'
      })
    }
  };
  Organizer.init({
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
    modelName: 'Organizer',
  });
  return Organizer;
};