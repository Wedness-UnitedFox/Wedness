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
      Checkout.belongsTo(models.Venue, { foreignKey: 'VendorId' })
      Checkout.belongsTo(models.Organizer, { foreignKey: 'VendorId' })
      Checkout.belongsTo(models.Catering, { foreignKey: 'VendorId' })
      Checkout.belongsTo(models.User, { foreignKey: 'UserId' })
    }
  };
  Checkout.init({
    isPaid: DataTypes.BOOLEAN,
    isApproved: DataTypes.BOOLEAN,
    subtotal: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isNumeric: true,
        notEmpty: {
          args: true,
          msg: "Input Subtotal cannot be empty"
        }
      }
    },
    vendor_type: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Input Vendor Type cannot be empty"
        }
      }
    },
    VendorId: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Checkout',
  });

  Checkout.beforeCreate((checkout, options) => {
    checkout.isPaid = false
    checkout.isApproved = false
  })
  return Checkout;
};