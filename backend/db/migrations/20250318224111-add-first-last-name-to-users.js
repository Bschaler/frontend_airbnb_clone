// backend/db/migrations/20250318224111-add-first-last-name-to-users.js
'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA || 'airbnb_schema';  
}

module.exports = {
  async up(queryInterface, Sequelize) {
    // In production, let's just skip this migration since the columns already exist
    if (process.env.NODE_ENV === 'production') {
      console.log('Skipping migration in production as columns already exist');
      return;
    }
    
    // Only run in development
    try {
      const tableInfo = await queryInterface.describeTable('Users');
      
      // Only add firstName if it doesn't exist
      if (!tableInfo.firstName) {
        await queryInterface.addColumn('Users', 'firstName', {   
          type: Sequelize.STRING,
          allowNull: true                                      
        });
      }
      
      // Only add lastName if it doesn't exist
      if (!tableInfo.lastName) {
        await queryInterface.addColumn('Users', 'lastName', {     
          type: Sequelize.STRING,
          allowNull: true                                      
        });
      }
    } catch (error) {
      console.log('Error checking columns, might be first migration:', error.message);
    }
  },

  async down(queryInterface, Sequelize) {

    if (process.env.NODE_ENV === 'production') {
      console.log('Skipping down migration in production');
      return;
    }
    
    options.tableName = "Users";
    
    try {
      const tableInfo = await queryInterface.describeTable('Users');
      
      if (tableInfo.firstName) {
        await queryInterface.removeColumn('Users', 'firstName');
      }
      
      if (tableInfo.lastName) {
        await queryInterface.removeColumn('Users', 'lastName');
      }
    } catch (error) {
      console.log('Error removing columns:', error.message);
    }
  }
};