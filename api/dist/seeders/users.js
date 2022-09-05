var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
module.exports = {
    up: (queryInterface, Sequelize) => __awaiter(this, void 0, void 0, function* () {
        const uuid = require('uuid');
        const bcrypt = require('bcrypt');
        yield queryInterface.bulkInsert('Users', [{
                username: 'josegranado',
                role: 0,
                email: 'jose.granado2014@gmail.com',
                type: 0,
                deleted: 0,
                uuid: yield uuid.v4(),
                password: yield bcrypt.hashSync('alfonzo97', 10),
                verified: 1,
                createdAt: new Date(),
                updatedAt: new Date()
            }]);
        yield queryInterface.bulkInsert('Profiles', [{
                first_name: 'Jose',
                last_name: 'Granado',
                createdAt: new Date(),
                updatedAt: new Date(),
                UserId: 1
            }]);
        yield queryInterface.bulkInsert('Users', [{
                username: 'hpereira',
                role: 0,
                email: 'hpereira@kabalaw.com',
                type: 0,
                deleted: 0,
                uuid: yield uuid.v4(),
                password: yield bcrypt.hashSync('pereira97', 10),
                verified: 1,
                createdAt: new Date(),
                updatedAt: new Date()
            }]);
        yield queryInterface.bulkInsert('Profiles', [{
                first_name: 'Hernán',
                last_name: 'Pereira',
                createdAt: new Date(),
                updatedAt: new Date(),
                UserId: 2
            }]);
        yield queryInterface.bulkInsert('Users', [{
                username: 'mkaba',
                role: 0,
                email: 'mkaba03@gmail.com',
                type: 0,
                deleted: 0,
                uuid: yield uuid.v4(),
                password: yield bcrypt.hashSync('mkaba97', 10),
                verified: 1,
                createdAt: new Date(),
                updatedAt: new Date()
            }]);
        yield queryInterface.bulkInsert('Profiles', [{
                first_name: 'Moisés',
                last_name: 'Kaba',
                createdAt: new Date(),
                updatedAt: new Date(),
                UserId: 3
            }]);
        //CARLOS G.
        yield queryInterface.bulkInsert('Users', [{
                username: 'cguanipa',
                role: 0,
                email: 'cguanipa@kabalaw.com',
                type: 0,
                deleted: 0,
                uuid: yield uuid.v4(),
                password: yield bcrypt.hashSync('cguanipa97', 10),
                verified: 1,
                createdAt: new Date(),
                updatedAt: new Date()
            }]);
        yield queryInterface.bulkInsert('Profiles', [{
                first_name: 'Carlos',
                last_name: 'Guanipa',
                createdAt: new Date(),
                updatedAt: new Date(),
                UserId: 4
            }]);
        //JACQUIN
        yield queryInterface.bulkInsert('Users', [{
                username: 'cjacquin',
                role: 0,
                email: 'cjacquin@kabalaw.com',
                type: 0,
                deleted: 0,
                uuid: yield uuid.v4(),
                password: yield bcrypt.hashSync('cjaquin97', 10),
                verified: 1,
                createdAt: new Date(),
                updatedAt: new Date()
            }]);
        yield queryInterface.bulkInsert('Profiles', [{
                first_name: 'Carlos',
                last_name: 'jacquin',
                createdAt: new Date(),
                updatedAt: new Date(),
                UserId: 5
            }]);
        //JESÚS BALZA
        yield queryInterface.bulkInsert('Users', [{
                username: 'jbalza',
                role: 0,
                email: 'jbalza@kabalaw.com',
                type: 0,
                deleted: 0,
                uuid: yield uuid.v4(),
                password: yield bcrypt.hashSync('jbalza97', 10),
                verified: 1,
                createdAt: new Date(),
                updatedAt: new Date()
            }]);
        yield queryInterface.bulkInsert('Profiles', [{
                first_name: 'Jesús ',
                last_name: 'Balza',
                createdAt: new Date(),
                updatedAt: new Date(),
                UserId: 6
            }]);
        // JESUS
    }),
    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('Users', null, {});
    }
};
