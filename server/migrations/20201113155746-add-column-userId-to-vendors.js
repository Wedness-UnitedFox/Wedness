'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addColumn('Venues', 'UserId', {
      type: Sequelize.DataTypes.INTEGER,
      references: {
        model: {
          tableName: 'Users',
        },
        key: 'id',
        onUpdate: 'cascade',
        onDelete: 'cascade'
      }
    })
    await queryInterface.addColumn('Caterings', 'UserId', {
      type: Sequelize.DataTypes.INTEGER,
      references: {
        model: {
          tableName: 'Users',
        },
        key: 'id',
        onUpdate: 'cascade',
        onDelete: 'cascade'
      }
    })
    await queryInterface.addColumn('Organizers', 'UserId', {
      type: Sequelize.DataTypes.INTEGER,
      references: {
        model: {
          tableName: 'Users',
        },
        key: 'id',
        onUpdate: 'cascade',
        onDelete: 'cascade'
      }
    })
    
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */

    await queryInterface.removeColumn('Venues', 'UserId', {})
    await queryInterface.removeColumn('Organizers', 'UserId', {})
    await queryInterface.removeColumn('Caterings', 'UserId', {})
    
  }
  
};
