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
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        notEmpty: {
          args: true,
          msg: "Name cannot be empty"
        }
      }
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Address cannot be empty"
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: {
          msg: "Please input a valid email"
        },
        notEmpty: {
          args: true,
          msg: "Email cannot be empty"
        }
      }
    },
    phone_number: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Phone number cannot be empty"
        }
      }
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Price cannot be empty"
        },
        min: {
          args: [1],
          msg: "Price cannot be less than one"
        },
        isNumeric: {
          args: true
        }
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Description cannot be empty"
        }
      }
    },
    avatar: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Avatar cannot be empty"
        }
      }
    },
    UserId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Catering',
  });
  return Catering;
};