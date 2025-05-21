'use strict';
const bcrypt = require('bcryptjs');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
  options.tableName = "Users"; // This is important for down method
}

module.exports = {
  async up(queryInterface, Sequelize) {
    // In production, make sure to set the search path first
    if (process.env.NODE_ENV === 'production') {
      await queryInterface.sequelize.query(`SET search_path TO "${process.env.SCHEMA}", public;`);
    }
    
    return queryInterface.bulkInsert(
      options.schema ? `${options.schema}.Users` : 'Users', 
      [
        {
          email: 'demo@user.io',
          username: 'Demo-lition',
          firstName: 'Demo',
          lastName: 'User',
          hashedPassword: bcrypt.hashSync('password'),
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          email: 'user1@user.io',
          username: 'FakeUser1',
          firstName: 'Fake',
          lastName: 'User1',
          hashedPassword: bcrypt.hashSync('password2'),
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          email: 'user2@user.io',
          username: 'FakeUser2',
          firstName: 'Fake',
          lastName: 'User2',
          hashedPassword: bcrypt.hashSync('password3'),
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ]
    );
  },

  async down(queryInterface, Sequelize) {
    if (process.env.NODE_ENV === 'production') {
      await queryInterface.sequelize.query(`SET search_path TO "${process.env.SCHEMA}", public;`);
    }
    
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      options.schema ? `${options.schema}.Users` : 'Users', 
      {
        username: { [Op.in]: ['Demo-lition', 'FakeUser1', 'FakeUser2'] }
      }, 
      {}
    );
  }
};