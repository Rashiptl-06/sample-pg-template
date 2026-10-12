'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const TABLE = {
      schema: 'public',
      tableName: 'evaluation_frameworks',
    };

    await queryInterface.createTable(TABLE, {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      sector_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      deal_type_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      industry_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT,
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

    await queryInterface.addConstraint(TABLE, {
      fields: ['sector_id', 'deal_type_id', 'industry_id'],
      type: 'unique',
      name: 'evaluation_frameworks_sector_deal_type_industry_unique',
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable({
      schema: 'public',
      tableName: 'evaluation_frameworks',
    });
  },
};