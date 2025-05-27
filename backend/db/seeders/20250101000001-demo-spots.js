'use strict';
const { User, Spot, SpotImage } = require('../models');

module.exports = {
  async up(queryInterface, Sequelize) {

    
    const demoUser = await User.findOne({ where: { username: 'Demo-lition' } });
    const user1 = await User.findOne({ where: { username: 'FakeUser1' } });
    const user2 = await User.findOne({ where: { username: 'FakeUser2' } });

    if (!demoUser || !user1 || !user2) {
      throw new Error('Demo users not found. Must seed your Users first.');
    }

    const spots = await Spot.bulkCreate([
      
      
      // Demo-lition's spots 
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
  address: '42 Bourbon Trail',
  city: 'Louisville',
  state: 'KY',
  country: 'USA',
  lat: 38.2542,
  lng: -85.7585,
  name: 'Historic Bourbon District Loft',
  description: 'Beautifully restored 1890s warehouse loft with exposed brick walls and original hardwood floors. Located in Louisville\'s Bourbon District, walking distance to distilleries and the Kentucky Derby Museum.',
  price: 165.00,
  createdAt: new Date(),
  updatedAt: new Date()
},

{
  ownerId: user1.id,
  address: '88 Red Rock Canyon Road',
  city: 'Sedona',
  state: 'AZ',
  country: 'USA',
  lat: 34.8697,
  lng: -111.7610,
  name: 'Red Rock Sanctuary Retreat',
  description: 'Stunning adobe-style home with breathtaking red rock views and private hot tub. Features Southwestern décor, meditation room, and gourmet kitchen. Perfect for spiritual retreats and hiking adventures.',
  price: 285.00,
  createdAt: new Date(),
  updatedAt: new Date()
},

{
  ownerId: user1.id,
  address: '1492 Historic Wharf',
  city: 'Charleston',
  state: 'SC',
  country: 'USA',
  lat: 32.7767,
  lng: -79.9311,
  name: 'Antebellum Charm Historic Carriage House',
  description: 'Meticulously restored 1847 carriage house in Charleston\'s Historic District. Original heart pine floors, 14-foot ceilings, and private courtyard garden with jasmine and magnolias.',
  price: 195.00,
  createdAt: new Date(),
  updatedAt: new Date()
},

{
  ownerId: user1.id,
  address: '2001 Glacier View Drive',
  city: 'Jackson',
  state: 'WY',
  country: 'USA',
  lat: 43.4799,
  lng: -110.7624,
  name: 'Mountain Lodge at Grand Teton',
  description: 'Luxury mountain lodge with unobstructed Grand Teton views. Features timber beam ceilings, stone fireplace, and wraparound deck for wildlife viewing. World-class skiing and hiking nearby.',
  price: 425.00,
  createdAt: new Date(),
  updatedAt: new Date()
},

{
  ownerId: user2.id,
  address: '101 Island Paradise Lane',
  city: 'Key West',
  state: 'FL',
  country: 'USA',
  lat: 24.5551,
  lng: -81.7800,
  name: 'Tropical Paradise Beach House',
  description: 'Classic Key West conch house with wrap-around porches and private beach access. Features tropical décor, tiki bar, and open-concept living. Walking distance to Duval Street nightlife.',
  price: 340.00,
  createdAt: new Date(),
  updatedAt: new Date()
},

{
  ownerId: user2.id,
  address: '777 Vineyard Estate Road',
  city: 'Napa',
  state: 'CA',
  country: 'USA',
  lat: 38.2975,
  lng: -122.2869,
  name: 'Luxury Vineyard Estate Villa',
  description: 'Exclusive estate villa surrounded by vineyard hills. Features private wine cellar, tasting room, infinity pool, and panoramic valley views. Includes concierge services for winery tours.',
  price: 650.00,
  createdAt: new Date(),
  updatedAt: new Date()
},

{
  ownerId: user2.id,
  address: '1776 Freedom Trail',
  city: 'Boston',
  state: 'MA',
  country: 'USA',
  lat: 42.3601,
  lng: -71.0589,
  name: 'Revolutionary War Era Brownstone',
  description: 'Meticulously preserved 1780s Federal-style brownstone on Beacon Hill. Original wide-plank floors, working fireplaces, and private garden. Walk to Freedom Trail historic sites.',
  price: 275.00,
  createdAt: new Date(),
  updatedAt: new Date()
}
    ], { validate: true, returning: true });

    
    await SpotImage.bulkCreate([
      // Demo-lition's spot images [0-3]
      //SF
      {
        spotId: spots[0].id,
        url: 'https://images.pexels.com/photos/2263687/pexels-photo-2263687.jpeg',
        preview: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      //LA
      {
        spotId: spots[1].id,
        url: 'https://images.pexels.com/photos/323775/pexels-photo-323775.jpeg',
        preview: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      
      //Denver
      {
        spotId: spots[2].id,
        url: 'https://images.pexels.com/photos/7746554/pexels-photo-7746554.jpeg',
        preview: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      //LOU
      {
        spotId: spots[3].id,
        url: 'https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg',
        preview: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      
      // FakeUser1's spot images [4-6]
      //Sedona
      {
        spotId: spots[4].id,
        url: 'https://images.pexels.com/photos/15504475/pexels-photo-15504475/free-photo-of-facade-of-a-suburban-house.jpeg',
        preview: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      //SC
      {
        spotId: spots[5].id,
        url: 'https://images.pexels.com/photos/8407019/pexels-photo-8407019.jpeg',
        preview: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      //WY
      {
        spotId: spots[6].id,
        url: 'https://images.pexels.com/photos/7746911/pexels-photo-7746911.jpeg',
        preview: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      
      // FakeUser2's spot images (spots[7-9])
      //FL
      {
        spotId: spots[7].id,
        url: 'https://images.pexels.com/photos/53610/large-home-residential-house-architecture-53610.jpeg',
        preview: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      //napaknowhow
      {
        spotId: spots[8].id,
        url: 'https://images.pexels.com/photos/8134845/pexels-photo-8134845.jpeg',
        preview: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      //Boston
      {
        spotId: spots[9].id,
        url: 'https://images.pexels.com/photos/187815/pexels-photo-187815.jpeg',
        preview: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], { validate: true });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('SpotImages', null, {});
    await queryInterface.bulkDelete('Spots', null, {});
  }
};