'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

module.exports = {
  async up(queryInterface, Sequelize) {
    if (process.env.NODE_ENV === 'production') {
      await queryInterface.sequelize.query(`SET search_path TO "${process.env.SCHEMA}", public;`);
    }

    const usersTable = process.env.NODE_ENV === 'production' ? `${process.env.SCHEMA}.Users` : 'Users';
    const spotsTable = process.env.NODE_ENV === 'production' ? `${process.env.SCHEMA}.Spots` : 'Spots';
    
    const users = await queryInterface.sequelize.query(
      `SELECT id FROM ${usersTable} LIMIT 3;`,
      { type: Sequelize.QueryTypes.SELECT }
    );
    
    const spots = await queryInterface.sequelize.query(
      `SELECT id FROM ${spotsTable} LIMIT 3;`,
      { type: Sequelize.QueryTypes.SELECT }
    );
    
    if (!users || users.length === 0 || !spots || spots.length === 0) {
      throw new Error('Users or spots not found. Make sure to seed them first.');
    }

    function getDates(startDays, length) {
      const startDate = new Date();
      startDate.setDate(startDate.getDate() + startDays);
      const endDate = new Date(startDate);
      endDate.setDate(endDate.getDate() + length);
      return {
        startDate: startDate.toISOString().split('T')[0], 
        endDate: endDate.toISOString().split('T')[0],    
      };
    }

    const bookings = [
      {
        spotId: spots[0].id,
        userId: users[1].id,
        ...getDates(10, 5),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        spotId: spots[0].id,
        userId: users[2].id,
        ...getDates(20, 5),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        spotId: spots[1].id,
        userId: users[0].id,
        ...getDates(5, 3),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        spotId: spots[1].id,
        userId: users[2].id,
        ...getDates(12, 4),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        spotId: spots[2].id,
        userId: users[1].id,
        ...getDates(30, 5),
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ];

    const bookingsTable = process.env.NODE_ENV === 'production' ? `${process.env.SCHEMA}.Bookings` : 'Bookings';
    return queryInterface.bulkInsert(bookingsTable, bookings, {});
  },

  async down(queryInterface, Sequelize) {
    if (process.env.NODE_ENV === 'production') {
      await queryInterface.sequelize.query(`SET search_path TO "${process.env.SCHEMA}", public;`);
    }
    
    const bookingsTable = process.env.NODE_ENV === 'production' ? `${process.env.SCHEMA}.Bookings` : 'Bookings';
    return queryInterface.bulkDelete(bookingsTable, {}, {});
  }
};