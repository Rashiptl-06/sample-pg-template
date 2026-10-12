'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const TABLE = {
      schema: 'public',
      tableName: 'ai_deal_parameter_results',
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

      framework_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: {
            schema: 'public',
            tableName: 'evaluation_frameworks',
          },
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },

      category_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: {
            schema: 'public',
            tableName: 'evaluation_categories',
          },
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },

      parameter_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: {
            schema: 'public',
            tableName: 'evaluation_parameters',
          },
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },

      confidence_level: {
        type: Sequelize.ENUM('High', 'Moderate', 'Low'),
        allowNull: false,
      },

      confidence_score: {
        type: Sequelize.DECIMAL(4, 3),
        allowNull: false,
      },

      ai_value: {
        type: Sequelize.JSONB,
        allowNull: true,
      },

      ai_summary: {
        type: Sequelize.TEXT,
        allowNull: true,
      },

      citations_count: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
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

    await queryInterface.addConstraint(TABLE, {
      fields: ['deal_id', 'framework_id', 'parameter_id'],
      type: 'unique',
      name: 'ai_deal_parameter_results_deal_framework_parameter_unique',
    });

    await queryInterface.sequelize.query(`
      ALTER TABLE public.ai_deal_parameter_results
      ADD CONSTRAINT ai_deal_parameter_results_confidence_score_range
      CHECK (confidence_score >= 0 AND confidence_score <= 1)
    `);
  },

  async down(queryInterface) {
    await queryInterface.dropTable({
      schema: 'public',
      tableName: 'ai_deal_parameter_results',
    });

    await queryInterface.sequelize.query(`
      DROP TYPE IF EXISTS "public"."enum_ai_deal_parameter_results_confidence_level"
    `);
  },
};