// backend/db/migrations/20250318224111-add-first-last-name-to-users.js
'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA || 'airbnb_schema';  
}

module.exports = {
  async up(queryInterface, Sequelize) {
  
    const tableInfo = await queryInterface.describeTable(
      process.env.NODE_ENV === 'production' ? `${options.schema}.Users` : 'Users'
    );
    

    if (!tableInfo.firstName) {
      await queryInterface.addColumn('Users', 'firstName', {   
        type: Sequelize.STRING,
        allowNull: true                                      
      }, options);
    }
    

    if (!tableInfo.lastName) {
      await queryInterface.addColumn('Users', 'lastName', {     
        type: Sequelize.STRING,
        allowNull: true                                      
      }, options);
    }
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "Users";
 
    const tableInfo = await queryInterface.describeTable(
      process.env.NODE_ENV === 'production' ? `${options.schema}.Users` : 'Users'
    );
    
    if (tableInfo.firstName) {
      await queryInterface.removeColumn(options, 'firstName');
    }
    
    if (tableInfo.lastName) {
      await queryInterface.removeColumn(options, 'lastName');
    }
  }
};
