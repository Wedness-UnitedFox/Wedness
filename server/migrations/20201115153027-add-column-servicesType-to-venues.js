'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addColumn('Venues', 'service_type', {
      type: Sequelize.DataTypes.STRING
    })
    await queryInterface.addColumn('Caterings', 'service_type', {
      type: Sequelize.DataTypes.STRING
    })
    await queryInterface.addColumn('Organizers', 'service_type', {
      type: Sequelize.DataTypes.STRING
    })
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeColumn('Venues', 'service_type', {})
    await queryInterface.removeColumn('Organizers', 'service_type', {})
    await queryInterface.removeColumn('Caterings', 'service_type', {})
  }
};
