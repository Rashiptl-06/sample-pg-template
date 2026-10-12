'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('source_deals', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      repository_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      deal_name: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      source_path: {
        type: Sequelize.STRING(500),
        allowNull: true,
      },
      deal_type_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      storage_path: {
        type: Sequelize.STRING(500),
        allowNull: false,
      },
      active: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW'),
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW'),
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('source_deals');
  },
};