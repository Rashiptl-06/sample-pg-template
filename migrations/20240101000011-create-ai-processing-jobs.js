'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const TABLE = {
      schema: 'public',
      tableName: 'ai_processing_jobs',
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
        allowNull: true,
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

      job_type: {
        type: Sequelize.ENUM(
          'PARAMETER_EVALUATION',
          'DILIGENCE_REPORT_GENERATION',
          'VIRTUAL_IC_MEMBER_REPORT_GENERATION',
          'BALANCED_REPORT_GENERATION',
        ),
        allowNull: false,
      },

      report_version_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },

      status: {
        type: Sequelize.ENUM(
          'Pending',
          'Ready',
          'Failed',
          'In Progress',
        ),
        allowNull: false,
        defaultValue: 'Pending',
      },

      reason: {
        type: Sequelize.ENUM(
          'INITIAL_PROCESSING',
          'NEW_FILE_CLASSIFIED',
          'FILE_UPDATED',
          'FILE_DELETED',
          'FRAMEWORK_CHANGED',
          'METADATA_CHANGED',
          'MANUAL_REPROCESS',
        ),
        allowNull: false,
      },

      retry_of_job_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: {
            schema: 'public',
            tableName: 'ai_processing_jobs',
          },
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },

      error_message: {
        type: Sequelize.TEXT,
        allowNull: true,
      },

      requested_by: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },

      requested_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW'),
      },

      started_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },

      completed_at: {
        type: Sequelize.DATE,
        allowNull: true,
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

    await queryInterface.sequelize.query(`
      CREATE INDEX ai_processing_jobs_retry_of_job_id_idx
      ON public.ai_processing_jobs (retry_of_job_id)
      WHERE retry_of_job_id IS NOT NULL
    `);

    await queryInterface.sequelize.query(`
      CREATE UNIQUE INDEX ai_jobs_active_unique
      ON public.ai_processing_jobs (deal_id, job_type)
      WHERE status IN ('Pending', 'In Progress') AND active = true
    `);
  },

  async down(queryInterface) {
    await queryInterface.sequelize.query(`
      DROP INDEX IF EXISTS public.ai_jobs_active_unique
    `);

    await queryInterface.sequelize.query(`
      DROP INDEX IF EXISTS public.ai_processing_jobs_retry_of_job_id_idx
    `);

    await queryInterface.dropTable({
      schema: 'public',
      tableName: 'ai_processing_jobs',
    });

    await queryInterface.sequelize.query(`
      DROP TYPE IF EXISTS "public"."enum_ai_processing_jobs_status"
    `);

    await queryInterface.sequelize.query(`
      DROP TYPE IF EXISTS "public"."enum_ai_processing_jobs_reason"
    `);

    await queryInterface.sequelize.query(`
      DROP TYPE IF EXISTS "public"."enum_ai_processing_jobs_job_type"
    `);
  },
};