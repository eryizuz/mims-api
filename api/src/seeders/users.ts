module.exports = {
    up: async (queryInterface, Sequelize) => {
        const uuid = require('uuid');
        const bcrypt = require('bcrypt');
        await queryInterface.bulkInsert('Users', [{
            username: 'josegranado',
            role: 0,
            email: 'jose.granado2014@gmail.com',
            type: 0,
            deleted: 0,
            uuid: await uuid.v4(),
            password: await bcrypt.hashSync('alfonzo97', 10),
            verified: 1,
            createdAt: new Date(),
            updatedAt: new Date()
        }]);
        await queryInterface.bulkInsert('Profiles', [{
            first_name: 'Jose',
            last_name: 'Granado',
            createdAt: new Date(),
            updatedAt: new Date(),
            UserId: 1
        }]);
        await queryInterface.bulkInsert('Users', [{
            username: 'hpereira',
            role: 0,
            email: 'hpereira@kabalaw.com',
            type: 0,
            deleted: 0,
            uuid: await uuid.v4(),
            password: await bcrypt.hashSync('pereira97', 10),
            verified: 1,
            createdAt: new Date(),
            updatedAt: new Date()
        }]);
        await queryInterface.bulkInsert('Profiles', [{
            first_name: 'Hernán',
            last_name: 'Pereira',
            createdAt: new Date(),
            updatedAt: new Date(),
            UserId: 2
        }]);
        await queryInterface.bulkInsert('Users', [{
            username: 'mkaba',
            role: 0,
            email: 'mkaba03@gmail.com',
            type: 0,
            deleted: 0,
            uuid: await uuid.v4(),
            password: await bcrypt.hashSync('mkaba97', 10),
            verified: 1,
            createdAt: new Date(),
            updatedAt: new Date()
        }]);
        await queryInterface.bulkInsert('Profiles', [{
            first_name: 'Moisés',
            last_name: 'Kaba',
            createdAt: new Date(),
            updatedAt: new Date(),
            UserId: 3
        }]);
        //CARLOS G.
        await queryInterface.bulkInsert('Users', [{
            username: 'cguanipa',
            role: 0,
            email: 'cguanipa@kabalaw.com',
            type: 0,
            deleted: 0,
            uuid: await uuid.v4(),
            password: await bcrypt.hashSync('cguanipa97', 10),
            verified: 1,
            createdAt: new Date(),
            updatedAt: new Date()
        }]);
        await queryInterface.bulkInsert('Profiles', [{
            first_name: 'Carlos',
            last_name: 'Guanipa',
            createdAt: new Date(),
            updatedAt: new Date(),
            UserId: 4
        }]);
        //JACQUIN
        await queryInterface.bulkInsert('Users', [{
            username: 'cjacquin',
            role: 0,
            email: 'cjacquin@kabalaw.com',
            type: 0,
            deleted: 0,
            uuid: await uuid.v4(),
            password: await bcrypt.hashSync('cjaquin97', 10),
            verified: 1,
            createdAt: new Date(),
            updatedAt: new Date()
        }]);
        await queryInterface.bulkInsert('Profiles', [{
            first_name: 'Carlos',
            last_name: 'jacquin',
            createdAt: new Date(),
            updatedAt: new Date(),
            UserId: 5
        }]);
        //JESÚS BALZA
        await queryInterface.bulkInsert('Users', [{
            username: 'jbalza',
            role: 0,
            email: 'jbalza@kabalaw.com',
            type: 0,
            deleted: 0,
            uuid: await uuid.v4(),
            password: await bcrypt.hashSync('jbalza97', 10),
            verified: 1,
            createdAt: new Date(),
            updatedAt: new Date()
        }]);
        await queryInterface.bulkInsert('Profiles', [{
            first_name: 'Jesús ',
            last_name: 'Balza',
            createdAt: new Date(),
            updatedAt: new Date(),
            UserId: 6
        }]);
        // JESUS
    },
    down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Users', null, {});
    }
};