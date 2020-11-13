'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Checkouts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      isPaid: {
        type: Sequelize.BOOLEAN
      },
      subtotal: {
        type: Sequelize.INTEGER
      },
      isApproved: {
        type: Sequelize.BOOLEAN
      },
      vendor_type: {
        type: Sequelize.STRING
      },
      VendorId: {
        type: Sequelize.INTEGER
      },
      UserId: {
        type: Sequelize.INTEGER
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
    await queryInterface.dropTable('Checkouts');
  }
};