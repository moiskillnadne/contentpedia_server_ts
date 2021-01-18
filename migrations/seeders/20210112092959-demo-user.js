'use strict';

module.exports = {
    up: async(queryInterface, Sequelize) => {
        return await queryInterface.bulkInsert('Users', [{
            firstName: 'VictorTest',
            lastName: 'RyabkovTest',
            email: 'example@example.com',
            password: 'testtest',
            role: 'member',
            createdAt: new Date(),
            updatedAt: new Date()
        }]);
    },

    down: async(queryInterface, Sequelize) => {
        return await queryInterface.bulkDelete('Users', null, {});
    }
};