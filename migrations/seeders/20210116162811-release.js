'use strict';

module.exports = {
    up: async(queryInterface, Sequelize) => {
        const json = JSON.stringify({
            isComplete: false,
            channel: {},
            video: {},
            guest: {},
            recommendation: {},
            createdAt: new Date(),
            updatedAt: new Date()
        })


        return await queryInterface.bulkInsert('Releases', [json], {});

    },

    down: async(queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('Releases', null, {});
    }
};