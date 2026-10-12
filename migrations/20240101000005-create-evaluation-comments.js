'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
  const TABLE = {
    schema: 'public',
    tableName: 'evaluation_comments',
  };

  await queryInterface.createTable(TABLE, {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },

    deal_id: {
      type: DataTypes.INTEGER,
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

    category_id: {
      type: DataTypes.INTEGER,
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
      type: DataTypes.INTEGER,
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

    title: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    comment: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    created_by: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },

    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: fn('NOW'),
    },

    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: fn('NOW'),
    },
  });

  await queryInterface.addIndex(
  TABLE,
  ['deal_id', 'parameter_id'],
  {
    name: 'evaluation_comments_deal_id_parameter_id_idx',
  },
);

  },

  async down(queryInterface) {
    const TABLE = {
      schema: 'public',
      tableName: 'evaluation_comments',
    };

    await queryInterface.removeIndex(
      TABLE,
      'evaluation_comments_deal_id_parameter_id_idx',
    );

    await queryInterface.dropTable(TABLE);
  },
};