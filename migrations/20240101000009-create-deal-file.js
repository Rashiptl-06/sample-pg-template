'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('deal_files', {
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

      source_file_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: {
            schema: 'public',
            tableName: 'source_deal_files',
          },
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },

      classification_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: {
            schema: 'public',
            tableName: 'file_classifications',
          },
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },

      classification_tagged_by: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },

      classification_tagged_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },

      source_file_version: {
        type: Sequelize.INTEGER,
        allowNull: false,
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
    await queryInterface.dropTable('deal_files');
  },
};