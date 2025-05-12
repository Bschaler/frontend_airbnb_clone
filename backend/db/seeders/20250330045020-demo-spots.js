'use strict';

const { User, Spot, SpotImage } = require('../models');

module.exports = {
  async up(queryInterface, Sequelize) {
    const options = process.env.NODE_ENV === 'production' ? {
      schema: process.env.SCHEMA
    } : {};

    const demoUser = await User.findOne({ where: { username: 'Demo-lition' } });
    if (!demoUser) throw new Error('Demo user not found');

    const spots = await Spot.bulkCreate([
      {
        ownerId: demoUser.id,
        address: '123 Tech Street',
        city: 'San Francisco',
        state: 'CA',
        country: 'USA',
        lat: 37.7749,
        lng: -122.4194,
        name: 'App Academy',
        description: 'Modern coding bootcamp in the heart of SF',
        price: 200.00,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        ownerId: demoUser.id,
        address: '456 Sunshine Blvd',
        city: 'Los Angeles',
        state: 'CA',
        country: 'USA',
        lat: 34.0522,
        lng: -118.2437,
        name: 'Sunny Retreat',
        description: 'Bright and airy retreat near the beach',
        price: 150.00,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        ownerId: demoUser.id,
        address: '789 Peak Road',
        city: 'Denver',
        state: 'CO',
        country: 'USA',
        lat: 39.7392,
        lng: -104.9903,
        name: 'Mountain View',
        description: 'Cozy cabin with stunning mountain views',
        price: 175.00,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        ownerId: demoUser.id,
        address: '555 Lakefront Drive',
        city: 'Chicago',
        state: 'IL',
        country: 'USA',
        lat: 41.8781,
        lng: -87.6298,
        name: 'Urban Lakeside Loft',
        description: 'Modern loft with panoramic views of Lake Michigan. Floor-to-ceiling windows, premium furnishings, and a fully equipped gourmet kitchen make this the perfect urban getaway.',
        price: 225.00,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        ownerId: demoUser.id,
        address: '321 Bourbon Street',
        city: 'New Orleans',
        state: 'LA',
        country: 'USA',
        lat: 29.9511,
        lng: -90.0715,
        name: 'Historic French Quarter Apartment',
        description: 'Authentic New Orleans experience in this historic French Quarter apartment. Original architectural details with modern amenities. Steps away from jazz clubs, restaurants, and vibrant nightlife.',
        price: 165.00,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        ownerId: demoUser.id,
        address: '777 Desert Road',
        city: 'Phoenix',
        state: 'AZ',
        country: 'USA',
        lat: 33.4484,
        lng: -112.0740,
        name: 'Desert Oasis',
        description: 'Tranquil desert retreat with private pool and mountain views. Enjoy the Arizona sunshine by day and starry skies by night. Perfect for those seeking peace and rejuvenation.',
        price: 190.00,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        ownerId: demoUser.id,
        address: '888 Beachfront Way',
        city: 'Miami',
        state: 'FL',
        country: 'USA',
        lat: 25.7617,
        lng: -80.1918,
        name: 'Oceanfront Penthouse',
        description: 'Luxury penthouse with direct beach access and breathtaking ocean views. Includes access to building amenities: infinity pool, fitness center, and 24-hour concierge service.',
        price: 350.00,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        ownerId: demoUser.id,
        address: '246 Broadway',
        city: 'Nashville',
        state: 'TN',
        country: 'USA',
        lat: 36.1627,
        lng: -86.7816,
        name: 'Music City Loft',
        description: 'Stylish downtown loft in the heart of Music City. Walking distance to Broadway honky-tonks, restaurants, and music venues. Perfect for music lovers and urban explorers.',
        price: 185.00,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        ownerId: demoUser.id,
        address: '101 Pike Place',
        city: 'Seattle',
        state: 'WA',
        country: 'USA',
        lat: 47.6062,
        lng: -122.3321,
        name: 'Pike Market Apartment',
        description: 'Charming apartment overlooking the historic Pike Place Market. Enjoy coffee from the original Starbucks while watching ferries cross Puget Sound from your window.',
        price: 210.00,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        ownerId: demoUser.id,
        address: '437 Canal Street',
        city: 'Amsterdam',
        state: 'North Holland',
        country: 'Netherlands',
        lat: 52.3676,
        lng: 4.9041,
        name: 'Canal-side Dutch Home',
        description: 'Authentic Dutch experience in this historic canal-side home. Original 17th century architecture with modern renovations. Bicycle included for true Amsterdam exploration.',
        price: 230.00,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        ownerId: demoUser.id,
        address: '15 Montmartre',
        city: 'Paris',
        state: 'Île-de-France',
        country: 'France',
        lat: 48.8566,
        lng: 2.3522,
        name: 'Parisian Artist Studio',
        description: 'Charming artist studio in the bohemian Montmartre district with views of Sacré-Cœur. Experience Paris like a local in this cozy, authentic space filled with character and light.',
        price: 195.00,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        ownerId: demoUser.id,
        address: '88 Shinjuku',
        city: 'Tokyo',
        state: 'Tokyo',
        country: 'Japan',
        lat: 35.6762,
        lng: 139.6503,
        name: 'Modern Tokyo Apartment',
        description: 'Ultra-modern apartment in the vibrant Shinjuku district. High-tech amenities meet traditional Japanese design elements. Convenient access to transportation, shopping, and nightlife.',
        price: 180.00,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], { ...options, validate: true });


    await SpotImage.bulkCreate([
      {
        spotId: spots[0].id,
        url: 'https://example.com/app-academy-preview.jpg',
        preview: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
     
      {
        spotId: spots[1].id,
        url: 'https://example.com/sunny-retreat-preview.jpg',
        preview: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },

      {
        spotId: spots[2].id,
        url: 'https://example.com/mountain-view-preview.jpg',
        preview: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
   {
        spotId: spots[3].id,
        url: 'https://example.com/urban-lakeside-preview.jpg',
        preview: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        spotId: spots[4].id,
        url: 'https://example.com/french-quarter-preview.jpg', 
        preview: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        spotId: spots[5].id,
        url: 'https://example.com/desert-oasis-preview.jpg',
        preview: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        spotId: spots[6].id,
        url: 'https://example.com/oceanfront-preview.jpg',
        preview: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        spotId: spots[7].id,
        url: 'https://example.com/music-city-preview.jpg',
        preview: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        spotId: spots[8].id,
        url: 'https://example.com/pike-market-preview.jpg', 
        preview: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        spotId: spots[9].id,
        url: 'https://example.com/amsterdam-preview.jpg',
        preview: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        spotId: spots[10].id,
        url: 'https://example.com/paris-preview.jpg',
        preview: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        spotId: spots[11].id,
        url: 'https://example.com/tokyo-preview.jpg', 
        preview: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], { ...options, validate: true });
  },

  async down(queryInterface, Sequelize) {
    const options = process.env.NODE_ENV === 'production' ? {
      schema: process.env.SCHEMA
    } : {};

    await queryInterface.bulkDelete('SpotImages', null, options);
    await queryInterface.bulkDelete('Spots', null, options);
  }
};
