'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('brands', 'logoPath', {
      type: Sequelize.STRING,
      allowNull: true, // Adjust allowNull as per your requirements
      defaultValue: null // You can set a default value if needed
    });

    // Example to change column position after 'name'
    await queryInterface.sequelize.query('ALTER TABLE brands MODIFY COLUMN logoPath VARCHAR(255) AFTER name;');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('brands', 'logoPath');
  }
};
