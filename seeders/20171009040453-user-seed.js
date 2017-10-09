'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
        {
          username: 'johndoe',
          password: 'foobar',
          role: 'teacher',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          username: 'pakdengklek',
          password: 'gogetgold',
          role: 'academic',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          username: 'charlesxavier',
          password: 'magnetowhy',
          role: 'headmaster',
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
