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
      Organizer.belongsTo(models.User)
    }
  };
  Organizer.init({
    name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true
      }
    },
    address: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true
      }
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true
      }
    },
    phone_number: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true
      }
    },
    // photos: {
    //   type: DataTypes.STRING,
    //   validate: {
    //     notEmpty: true
    //   }
    // },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isNumeric: true,
        notEmpty: {
          args: true,
          msg: "Input price cannot be empty"
        },
        min: {
          args: [1],
          msg: "Price cannot be less than one"
        }
      }
    },
    description: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true
      }
    },
    avatar: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true
      }
    },
    service_type: DataTypes.STRING,
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Organizer',
  });
  return Organizer;
};