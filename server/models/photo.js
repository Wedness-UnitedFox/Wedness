'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Photo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Photo.init({
    photo_url: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Photo URL cannot be empty"
        }
      }
    },
    vendor_id: DataTypes.INTEGER,
    vendor_type: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Photo',
  });
  return Photo;
};