'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

module.exports = {
  async up(queryInterface, Sequelize) {
    const now = new Date();
    
 
    if (process.env.NODE_ENV === 'production') {
      await queryInterface.sequelize.query(`SET search_path TO "${process.env.SCHEMA}", public;`);
    }
    
   
    const usersTable = process.env.NODE_ENV === 'production' ? `${process.env.SCHEMA}.Users` : 'Users';
    const demoUser = await queryInterface.sequelize.query(
      `SELECT id FROM ${usersTable} WHERE username = 'Demo-lition' LIMIT 1`,
      { type: Sequelize.QueryTypes.SELECT }
    );
    
    if (!demoUser || demoUser.length === 0) {
      console.log('Demo user not found, skipping spot creation');
      return;
    }
    
    const demoUserId = demoUser[0].id;
    
    
    const spotsTable = process.env.NODE_ENV === 'production' ? `${process.env.SCHEMA}.Spots` : 'Spots';
    return queryInterface.bulkInsert(spotsTable, [
      {
        ownerId: demoUserId,
        address: '123 Demo Street',
        city: 'San Francisco',
        state: 'CA',
        country: 'USA',
        lat: 37.7749,
        lng: -122.4194,
        name: 'Beautiful SF Home',
        description: 'A lovely home in the heart of San Francisco',
        price: 150.00,
        createdAt: now,
        updatedAt: now
      },
      {
        ownerId: demoUserId,
        address: '456 Sunny Blvd',
        city: 'Los Angeles',
        state: 'CA',
        country: 'USA',
        lat: 34.0522,
        lng: -118.2437,
        name: 'LA Retreat',
        description: 'Sunny getaway near the beach',
        price: 200.00,
        createdAt: now,
        updatedAt: now
      }
    ]);
  },

  async down(queryInterface, Sequelize) {

    if (process.env.NODE_ENV === 'production') {
      await queryInterface.sequelize.query(`SET search_path TO "${process.env.SCHEMA}", public;`);
    }
    
 
    const spotsTable = process.env.NODE_ENV === 'production' ? `${process.env.SCHEMA}.Spots` : 'Spots';
    return queryInterface.bulkDelete(spotsTable, null, {});
  }
};