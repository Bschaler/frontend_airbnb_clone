const { sequelize } = require('./db/models');
const models = require('./db/models');

console.log('Starting setup...');
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('SCHEMA:', process.env.SCHEMA);

if (process.env.NODE_ENV === 'production' && process.env.SCHEMA) {
  sequelize.showAllSchemas({ logging: false })
    .then((data) => {
      console.log('Found schemas:', data);
      
      if (!data.includes(process.env.SCHEMA)) {
        console.log('Need to create schema');
        return sequelize.createSchema(process.env.SCHEMA);
      } else {
        console.log('Schema already exists');
        return Promise.resolve();
      }
    })
    .then(() => {
      console.log('Setting search path...');
      return sequelize.query(`SET search_path TO "${process.env.SCHEMA}", public;`);
    })
    .then(() => {
      console.log('Creating tables using models...');
      return models.User.sync({force: true});
    })
    .then(() => {
      console.log('Users table created!');
      return models.Spot.sync({force: true});
    })
    .then(() => {
      console.log('Spots table created!');
      return models.SpotImage.sync({force: true});
    })
    .then(() => {
      console.log('SpotImages table created!');
      return models.Review.sync({force: true});
    })
    .then(() => {
      console.log('Reviews table created!');
      return models.ReviewImage.sync({force: true});
    })
    .then(() => {
      console.log('ReviewImages table created!');
      return models.Booking.sync({force: true});
    })
    .then(() => {
      console.log('Bookings table created!');
      console.log('All tables created successfully!');
      console.log('Setup complete!');
      process.exit(0);
    })
    .catch((err) => {
      console.log('Got an error:', err);
      process.exit(1);
    });
} else {
  console.log('Not in production mode or no SCHEMA set');
  process.exit(0);
}