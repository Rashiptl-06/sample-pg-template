'use strict';

/** @type {import('sequelize-cli').Seeder} */
module.exports = {
  /**
   * @param {import('sequelize').QueryInterface} queryInterface
   */
  async up(queryInterface) {
    const now = new Date();

    await queryInterface.bulkInsert(
      {
        schema: 'public',
        tableName: 'deal_stages',
      },
      [
        {
          id: 1,
          code: 'Deal Created',
          name: 'Deal Created',
          display_order: 1,
          active: true,
          created_at: now,
          updated_at: now,
        },
        {
          id: 2,
          code: 'AI Output Review',
          name: 'AI Output Review',
          display_order: 2,
          active: true,
          created_at: now,
          updated_at: now,
        },
        {
          id: 3,
          code: 'Report Draft',
          name: 'Report Draft',
          display_order: 3,
          active: true,
          created_at: now,
          updated_at: now,
        },
        {
          id: 4,
          code: 'Submitted to HOD',
          name: 'Submitted to HOD',
          display_order: 4,
          active: true,
          created_at: now,
          updated_at: now,
        },
        {
          id: 5,
          code: 'HOD Changes Requested',
          name: 'HOD Changes Requested',
          display_order: 5,
          active: true,
          created_at: now,
          updated_at: now,
        },
        {
          id: 6,
          code: 'Submitted to IC',
          name: 'Submitted to IC',
          display_order: 6,
          active: true,
          created_at: now,
          updated_at: now,
        },
        {
          id: 7,
          code: 'Completed',
          name: 'Completed',
          display_order: 7,
          active: true,
          created_at: now,
          updated_at: now,
        },
      ],
    );
  },

  /**
   * @param {import('sequelize').QueryInterface} queryInterface
   */
  async down(queryInterface) {
    await queryInterface.bulkDelete(
      {
        schema: 'public',
        tableName: 'deal_stages',
      },
      null,
      {},
    );
  },
};