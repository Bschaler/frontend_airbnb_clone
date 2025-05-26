'use strict';
const { User, Spot, SpotImage } = require('../models');

module.exports = {
  async up(queryInterface, Sequelize) {
    // Get all three demo users
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
        description: 'Step into Kentucky\'s rich bourbon heritage in this beautifully restored 1890s warehouse loft. Exposed brick walls, original hardwood floors, and industrial fixtures create an authentic atmosphere. Located in the heart of Louisville\'s Bourbon District, you\'re walking distance to iconic distilleries, craft cocktail bars, and the famous Kentucky Derby Museum. The loft features a fully equipped kitchen with premium bourbon for tastings, a cozy reading nook, and stunning views of the Ohio River.',
        price: 165.00,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      
      // FakeUser1's spots (3 spots)
      {
        ownerId: user1.id,
        address: '88 Red Rock Canyon Road',
        city: 'Sedona',
        state: 'AZ',
        country: 'USA',
        lat: 34.8697,
        lng: -111.7610,
        name: 'Red Rock Sanctuary Retreat',
        description: 'Immerse yourself in Sedona\'s mystical energy at this stunning adobe-style home nestled among towering red rock formations. Wake up to breathtaking sunrise views over Cathedral Rock from the private hot tub on your expansive deck. This peaceful sanctuary features Southwestern décor, a meditation room with floor-to-ceiling windows, and a gourmet kitchen stocked with local organic ingredients. Perfect for spiritual retreats, romantic getaways, or adventure seekers wanting to explore world-class hiking trails, vortex sites, and art galleries.',
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
        description: 'Experience Southern hospitality at its finest in this meticulously restored 1847 carriage house in Charleston\'s coveted Historic District. Original heart pine floors, 14-foot ceilings, and period antiques transport you to the antebellum era. The private courtyard garden blooms with jasmine and magnolias, creating a romantic atmosphere for evening cocktails. Stroll cobblestone streets to renowned restaurants, rainbow row, and historic plantations. Includes complimentary sweet tea, pralines, and insider recommendations for the best shrimp and grits in the Holy City.',
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
        description: 'Escape to this luxury mountain lodge with unobstructed views of the Grand Teton mountain range. This architect-designed retreat features soaring timber beam ceilings, a massive stone fireplace, and floor-to-ceiling windows showcasing the dramatic alpine landscape. The gourmet kitchen is perfect for preparing meals with locally-sourced ingredients. Enjoy wildlife viewing from the wraparound deck - elk, moose, and eagles are frequent visitors. World-class skiing, hiking, and fishing are minutes away. Includes access to private hot tub, game room, and concierge services.',
        price: 425.00,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      
      // FakeUser2's spots (3 spots)
      {
        ownerId: user2.id,
        address: '101 Island Paradise Lane',
        city: 'Key West',
        state: 'FL',
        country: 'USA',
        lat: 24.5551,
        lng: -81.7800,
        name: 'Tropical Paradise Beach House',
        description: 'Live the island dream in this stunning beachfront retreat just steps from crystal-clear turquoise waters. This classic Key West conch house features wrap-around porches, ceiling fans, and tropical décor that captures the laid-back island vibe. Watch spectacular sunsets from your private beach access while sipping mojitos from the tiki bar. The open-concept living space flows seamlessly to outdoor areas perfect for lounging in hammocks or grilling fresh-caught fish. Walking distance to Duval Street\'s legendary nightlife, Hemingway House, and world-class snorkeling at the coral reef.',
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
        description: 'Indulge in the ultimate wine country experience at this exclusive estate villa surrounded by rolling vineyard hills. This Mediterranean-inspired retreat features a private wine cellar, tasting room, and panoramic valley views from every room. The gourmet kitchen is equipped with professional-grade appliances perfect for pairing with world-class Napa Valley wines. Relax by the infinity pool overlooking the vines, enjoy private wine tastings on the terrace, or explore nearby Michelin-starred restaurants. Includes concierge services for exclusive winery tours and reservations at the valley\'s most sought-after establishments.',
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
        description: 'Step into American history in this meticulously preserved 1780s Federal-style brownstone on Boston\'s iconic Beacon Hill. Original wide-plank floors, working fireplaces, and period furnishings create an authentic colonial atmosphere. The gas-lit streets and brick sidewalks transport you to Revolutionary War times. This three-story townhouse features a private garden, library with first-edition books, and modern amenities seamlessly integrated with historical charm. Walk the Freedom Trail to historic sites, enjoy world-class seafood in the North End, or catch a Red Sox game at nearby Fenway Park.',
        price: 275.00,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], { validate: true, returning: true });

    // Create spot images
    await SpotImage.bulkCreate([
      // Demo-lition's spot images (spots[0-3])
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