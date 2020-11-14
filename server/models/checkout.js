'use strict';
const {
  Model
} = require('sequelize');
const { checkout } = require('../app');
module.exports = (sequelize, DataTypes) => {
  class Checkout extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Checkout.belongsTo(models.Venue, {foreignKey:'VendorId'})
      Checkout.belongsTo(models.Organizer, {foreignKey:'VendorId'})
      Checkout.belongsTo(models.Catering, {foreignKey:'VendorId'})
      Checkout.belongsTo(models.User, {foreignKey:'UserId'})
    }
  };
  Checkout.init({
    isPaid: DataTypes.BOOLEAN,
    subtotal: DataTypes.INTEGER,
    isApproved: DataTypes.BOOLEAN,
    vendor_type: DataTypes.STRING,
    VendorId: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Checkout',
  });

  Checkout.beforeCreate((checkout, options)=>{
    checkout.isPaid = false
    checkout.isApproved = false
  })
  return Checkout;
};