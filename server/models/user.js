'use strict';
const { hashPassword } = require('../helpers/bcryptjs')
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Checkout, {
        foreignKey: "UserId",
        sourceKey: 'id'
      })
    }
  };
  User.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Name cannot be empty"
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false, 
      unique: true,
      validate: {
        notEmpty: {
          args: true,
          msg: "Email cannot be empty"
        }, 
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
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [6,],
          msg: "Use at least 6 characters"
        },
        notEmpty: {
          args: true,
          msg: "Password cannot be empty"
        }
      }
    },
    role: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  User.beforeCreate((user, options) => {
    user.password = hashPassword(user.password)
  })
  return User;
};