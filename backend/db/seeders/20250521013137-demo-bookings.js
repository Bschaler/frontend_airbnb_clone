'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const now = new Date();
    
    // Get users
    const users = await queryInterface.sequelize.query(
      'SELECT id FROM Users',
      { type: Sequelize.QueryTypes.SELECT }
    );
    
    // Get spots
    const spots = await queryInterface.sequelize.query(
      'SELECT id FROM Spots',
      { type: Sequelize.QueryTypes.SELECT }
    );
    
    if (!users.length || !spots.length) {
      console.log('Users or spots not found, skipping booking creation');
      return;
    }
    
    // Function to generate dates
    function getDates(startDays, length) {
      const startDate = new Date();
      startDate.setDate(startDate.getDate() + startDays);
      const endDate = new Date(startDate);
      endDate.setDate(endDate.getDate() + length);
      return {
        startDate: startDate,
        endDate: endDate,
      };
    }
    
    return queryInterface.bulkInsert('Bookings', [
      {
        spotId: spots[0].id,
        userId: users[1].id,  // FakeUser1
        startDate: getDates(10, 5).startDate,
        endDate: getDates(10, 5).endDate,
        createdAt: now,
        updatedAt: now
      },
      {
        spotId: spots[0].id,
        userId: users[2].id,  // FakeUser2
        startDate: getDates(20, 5).startDate,
        endDate: getDates(20, 5).endDate,
        createdAt: now,
        updatedAt: now
      },
      {
        spotId: spots[1].id,
        userId: users[0].id,  
        startDate: getDates(5, 3).startDate,
        endDate: getDates(5, 3).endDate,
        createdAt: now,
        updatedAt: now
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Bookings', null, {});
  }
};