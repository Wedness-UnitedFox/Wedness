'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Venue extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Venue.hasMany(models.Checkout, {
        foreignKey: 'VendorId',
        sourceKey: 'id'
      })
      Venue.hasMany(models.Photo, {
        foreignKey: 'vendor_id',
        sourceKey: 'id'
      })
    }
  };
  Venue.init({
    name: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Input name cannot be empty"
        }, 
      }
    },
    description: DataTypes.STRING,
    address: DataTypes.STRING,
    email: DataTypes.STRING,
    phone_number: DataTypes.STRING, 
    price: DataTypes.INTEGER,
    type: DataTypes.STRING,
    avatar: DataTypes.STRING,
    UserId: DataTypes.INTEGER,
    capacity: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Venue',
  });
  return Venue;
};