'use strict';
module.exports = {
    up: async(queryInterface, Sequelize) => {
        await queryInterface.createTable('Users', {
            id: {
                type: Sequelize.DataTypes.UUID,
                allowNull: false,
                primaryKey: true
            },
            email: {
                allowNull: false,
                unique: true,
                type: Sequelize.DataTypes.STRING
            },
            password: {
                allowNull: false,
                type: Sequelize.DataTypes.STRING
            },
            firstName: {
                allowNull: false,
                type: Sequelize.DataTypes.STRING
            },
            lastName: {
                allowNull: false,
                type: Sequelize.DataTypes.STRING
            },
            role: {
                allowNull: false,
                type: Sequelize.DataTypes.STRING
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DataTypes.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DataTypes.DATE
            }
        });
    },
    down: async(queryInterface, Sequelize) => {
        await queryInterface.dropTable('Users');
    }
};