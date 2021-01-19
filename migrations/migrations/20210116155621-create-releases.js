'use strict';
module.exports = {
    up: async(queryInterface, Sequelize) => {
        await queryInterface.createTable('Releases', {
            id: {
                type: Sequelize.DataTypes.UUID,
                allowNull: false,
                primaryKey: true
            },
            isComplete: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
            },
            channel: {
                type: Sequelize.JSONB,
                allowNull: false,
            },
            video: {
                type: Sequelize.JSONB,
                allowNull: false,
            },
            guest: {
                type: Sequelize.JSONB,
                allowNull: false,
            },
            recommendation: {
                type: Sequelize.JSONB,
                allowNull: false,
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    down: async(queryInterface, Sequelize) => {
        await queryInterface.dropTable('Releases');
    }
};