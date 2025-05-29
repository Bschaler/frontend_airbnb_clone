'use strict';
const { User, Spot, Booking } = require('../models');

module.exports = {
  async up(queryInterface, Sequelize) {
   
    const demoUser = await User.findOne({ where: { username: 'Demo-lition' } });
    const user1 = await User.findOne({ where: { username: 'FakeUser1' } });
    const user2 = await User.findOne({ where: { username: 'FakeUser2' } });

    if (!demoUser || !user1 || !user2) {
      throw new Error('Users not found. Must seed your Users.');
    }

    const spots = await Spot.findAll();
    if (!spots.length) {
      throw new Error('Spots not found. Must seed your Spots.');
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

    await Booking.bulkCreate([
      {
        spotId: spots[0].id,
        userId: user1.id,
        ...getDates(10, 5),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        spotId: spots[0].id,
        userId: user2.id,
        ...getDates(20, 5),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        spotId: spots[1].id,
        userId: demoUser.id,
        ...getDates(5, 3),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        spotId: spots[2].id,
        userId: user1.id,
        ...getDates(30, 4),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        spotId: spots[3].id,
        userId: user2.id,
        ...getDates(15, 6),
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
  
    await Booking.destroy({ where: {} });
  }
};