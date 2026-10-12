'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        const TABLE = {
            schema: 'public',
            tableName: 'evaluation_categories',
        };

        await queryInterface.createTable(TABLE, {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false,
            },
            framework_id: {
                type: DataTypes.INTEGER,
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
            category_name: {
                type: DataTypes.STRING(255),
                allowNull: false,
            },
            display_order: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            created_by: {
                type: DataTypes.STRING(255),
                allowNull: false,
                defaultValue: 'system',
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
    },

async down(queryInterface) {
        await queryInterface.dropTable({
            schema: 'public',
            tableName: 'evaluation_categories',
        });
    },
};