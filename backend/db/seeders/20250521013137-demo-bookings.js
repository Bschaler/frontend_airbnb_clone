'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
   
    if (process.env.NODE_ENV === 'production') {
      await queryInterface.sequelize.query(`SET search_path TO "${process.env.SCHEMA}", public;`);
    }
    
   
    const users = await queryInterface.sequelize.query(
      `SELECT id FROM "Users" LIMIT 3;`,
      { type: Sequelize.QueryTypes.SELECT }
    );
    
   
    const spots = await queryInterface.sequelize.query(
      `SELECT id FROM "Spots" LIMIT 3;`,
      { type: Sequelize.QueryTypes.SELECT }
    );
    
    if (!users || users.length === 0 || !spots || spots.length === 0) {
      console.log('Users or spots not found, skipping bookings');
      return;
    }

  
    const today = new Date();
    const futureDate1 = new Date();
    futureDate1.setDate(today.getDate() + 15);
    
    const futureDate2 = new Date();
    futureDate2.setDate(today.getDate() + 25);
    
    const futureDate3 = new Date();
    futureDate3.setDate(today.getDate() + 8);
    
  
    const bookings = [
      {
        spotId: spots[0].id,
        userId: users[1].id,
        startDate: today.toISOString().split('T')[0],
        endDate: futureDate1.toISOString().split('T')[0],
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        spotId: spots[1].id,
        userId: users[0].id,
        startDate: today.toISOString().split('T')[0],
        endDate: futureDate2.toISOString().split('T')[0],
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        spotId: spots[2].id,
        userId: users[2].id,
        startDate: today.toISOString().split('T')[0],
        endDate: futureDate3.toISOString().split('T')[0],
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

   
    return queryInterface.bulkInsert('Bookings', bookings, {});
  },

  async down(queryInterface, Sequelize) {

    if (process.env.NODE_ENV === 'production') {
      await queryInterface.sequelize.query(`SET search_path TO "${process.env.SCHEMA}", public;`);
    }
    
    return queryInterface.bulkDelete('Bookings', null, {});
  }
};