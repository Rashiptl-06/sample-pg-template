'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const TABLE = {
      schema: 'public',
      tableName: 'deal_audit_logs',
    };

    await queryInterface.createTable(TABLE, {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },

      deal_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: {
            schema: 'public',
            tableName: 'deals',
          },
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },

      entity_type: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },

      entity_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },

      action: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },

      performed_by: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },

      summary: {
        type: Sequelize.TEXT,
        allowNull: false,
      },

      details: {
        type: Sequelize.JSONB,
        allowNull: true,
      },

      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW'),
      },
    });

    await queryInterface.sequelize.query(`
      CREATE INDEX deal_audit_logs_deal_created
      ON public.deal_audit_logs (deal_id, created_at)
    `);
  },

  async down(queryInterface) {
    await queryInterface.sequelize.query(`
      DROP INDEX IF EXISTS public.deal_audit_logs_deal_created
    `);

    await queryInterface.dropTable({
      schema: 'public',
      tableName: 'deal_audit_logs',
    });
  },
};