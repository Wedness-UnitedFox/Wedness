'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Venues', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.TEXT
      },
      address: {
        type: Sequelize.TEXT
      },
      email: {
        type: Sequelize.STRING
      },
      phone_number: {
        type: Sequelize.STRING
      }, 
      price: {
        type: Sequelize.INTEGER
      },
      type: {
        type: Sequelize.STRING
      },
      avatar: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Venues');
  }
};