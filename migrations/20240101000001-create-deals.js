'use strict';

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('deals', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },

      source_deal_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true,
      },

      repository_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },

      deal_name: {
        type: Sequelize.STRING(255),
        allowNull: false,
        unique: true,
      },

      sector_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },

      geography_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },

      sponsor_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },

      deal_type_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },

      industry_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },

      stage_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },

      status: {
        type: Sequelize.ENUM(
          'Draft',
          'Active',
          'On Hold',
          'Completed',
          'Cancelled',
          'Archived',
        ),
        allowNull: false,
        defaultValue: 'Draft',
      },

      nda_confirmed: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },

      ai_output_confirmed_by: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },

      ai_output_confirmed_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },

      stage_changed_by: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },

      stage_changed_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },

      completed_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },

      created_by: {
        type: Sequelize.STRING(255),
        allowNull: false,
        defaultValue: 'system',
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
    await queryInterface.dropTable('deals');

    await queryInterface.sequelize.query(
      'DROP TYPE IF EXISTS "enum_deals_status";',
    );
  },
};