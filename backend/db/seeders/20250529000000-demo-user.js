'use strict';
const bcrypt = require('bcryptjs');

module.exports = {
  async up(queryInterface, Sequelize) {
    let tableName = 'Users';
    if (process.env.NODE_ENV === 'production') {
      tableName = '"airbnb_schema"."Users"';
    }

    await queryInterface.bulkInsert(tableName, [
      {
        email: 'demo@user.io',
        username: 'Demo-lition',
        firstName: 'Frodo',
        lastName: 'Baggins',
        hashedPassword: bcrypt.hashSync('password'),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        email: 'user1@user.io',
        username: 'FakeUser1',
        firstName: 'Jarvis',
        lastName: 'Script',
        hashedPassword: bcrypt.hashSync('password2'),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        email: 'user2@user.io',
        username: 'FakeUser2',
        firstName: 'Terry',
        lastName: 'Dactyl',
        hashedPassword: bcrypt.hashSync('password3'),
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    let tableName = 'Users';
    if (process.env.NODE_ENV === 'production') {
      tableName = '"airbnb_schema"."Users"';
    }
    
    await queryInterface.bulkDelete(tableName, null, {});
  }
};