/*
const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const spotsRouter = require('./spots.js');
const reviewsRouter = require('./reviews.js');
const bookingsRouter = require('./bookings.js');
const csrfRouter = require('./csrf.js');
const reviewImagesRouter = require('./review-images.js');
const spotImagesRouter = require('./spot-images.js');
const { restoreUser } = require("../../utils/auth.js");

router.use(restoreUser);
router.use('/session', sessionRouter);
router.use('/users', usersRouter);
router.use('/spots', spotsRouter);
router.use('/reviews', reviewsRouter);
router.use('/bookings', bookingsRouter);
router.use('/csrf', csrfRouter);
router.use('/review-images', reviewImagesRouter);
router.use('/spot-images', spotImagesRouter);


module.exports = router;   */

const router = require('express').Router();
const { restoreUser } = require("../../utils/auth.js");

console.log('🔧 Loading API routes...');

// Import with error handling
let sessionRouter, usersRouter, spotsRouter, reviewsRouter, bookingsRouter, csrfRouter, reviewImagesRouter, spotImagesRouter;

try {
  sessionRouter = require('./session.js');
  console.log('✅ Session router loaded');
} catch (e) { console.error('❌ Session error:', e.message); }

try {
  usersRouter = require('./users.js');
  console.log('✅ Users router loaded - type:', typeof usersRouter);
} catch (e) { console.error('❌ Users error:', e.message); }

try {
  spotsRouter = require('./spots.js');
  console.log('✅ Spots router loaded');
} catch (e) { console.error('❌ Spots error:', e.message); }

try {
  reviewsRouter = require('./reviews.js');
  console.log('✅ Reviews router loaded');
} catch (e) { console.error('❌ Reviews error:', e.message); }

try {
  bookingsRouter = require('./bookings.js');
  console.log('✅ Bookings router loaded');
} catch (e) { console.error('❌ Bookings error:', e.message); }

try {
  csrfRouter = require('./csrf.js');
  console.log('✅ CSRF router loaded');
} catch (e) { console.error('❌ CSRF error:', e.message); }

try {
  reviewImagesRouter = require('./review-images.js');
  console.log('✅ Review images router loaded');
} catch (e) { console.error('❌ Review images error:', e.message); }

try {
  spotImagesRouter = require('./spot-images.js');
  console.log('✅ Spot images router loaded');
} catch (e) { console.error('❌ Spot images error:', e.message); }

// Apply middleware
router.use(restoreUser);

// Test route
router.get('/debug', (req, res) => {
  res.json({ 
    message: 'API debug working',
    routersLoaded: {
      session: !!sessionRouter,
      users: !!usersRouter,
      spots: !!spotsRouter,
      reviews: !!reviewsRouter,
      bookings: !!bookingsRouter,
      csrf: !!csrfRouter,
      reviewImages: !!reviewImagesRouter,
      spotImages: !!spotImagesRouter
    }
  });
});

// Mount routers
router.use('/session', sessionRouter);
router.use('/users', usersRouter);
router.use('/spots', spotsRouter);
router.use('/reviews', reviewsRouter);
router.use('/bookings', bookingsRouter);
router.use('/csrf', csrfRouter);
router.use('/review-images', reviewImagesRouter);
router.use('/spot-images', spotImagesRouter);

console.log('🎯 All API routes mounted');

module.exports = router;