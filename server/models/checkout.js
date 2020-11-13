'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Checkout extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Checkout.belongsTo(models.Venue)
      Checkout.belongsTo(models.Organizer)
      Checkout.belongsTo(models.Catering)
      Checkout.belongsTo(models.User)
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
  return Checkout;
};