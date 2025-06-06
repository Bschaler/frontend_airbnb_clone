'use strict';

const express = require('express');
const { Review, ReviewImage, User, Spot, SpotImage } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { Op } = require('sequelize');

const router = express.Router();

const validateReview = [
  check('review')
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage('Review text is required'),
  check('stars')
    .exists({ checkFalsy: true })
    .isInt({ min: 1, max: 5 })
    .withMessage('Stars must be an integer from 1 to 5'),
  handleValidationErrors
];

router.get('/current', requireAuth, async (req, res) => {
  const userId = req.user.id;

  const reviews = await Review.findAll({
    where: { userId },
    include: [
      { model: User, as: 'User', attributes: ['id', 'firstName', 'lastName'] }, 
      {
        model: Spot,
        attributes: ['id', 'ownerId', 'address', 'city', 'state', 'country', 'lat', 'lng', 'name', 'price'],
        include: [
          { model: SpotImage, attributes: ['id', 'url'], where: { preview: true }, required: false }
        ]
      },
      { model: ReviewImage, attributes: ['id', 'url'] }
    ]
  });

  const formattedReviews = reviews.map(review => {
    const spot = review.Spot ? {
      ...review.Spot.toJSON(),
      previewImage: review.Spot.SpotImages.length ? review.Spot.SpotImages[0].url : null
    } : null;

    return {
      id: review.id,
      userId: review.userId,
      spotId: review.spotId,
      review: review.review,
      stars: review.stars,
      createdAt: review.createdAt,
      updatedAt: review.updatedAt,
      User: review.User, 
      Spot: spot,
      ReviewImages: review.ReviewImages
    };
  });

  return res.json({ Reviews: formattedReviews });
});


router.put('/:reviewId', requireAuth, validateReview, async (req, res) => {
  try {
    const { reviewId } = req.params;
    const userId = req.user.id;
    const { review, stars } = req.body;

    const reviewToUpdate = await Review.findByPk(reviewId);
    if (!reviewToUpdate) {
      return res.status(404).json({ message: "Review couldn't be found" });
    }

    if (reviewToUpdate.userId !== userId) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    await reviewToUpdate.update({ review, stars });

    const updatedReview = {
      id: reviewToUpdate.id,
      userId: reviewToUpdate.userId,
      spotId: reviewToUpdate.spotId,
      review: reviewToUpdate.review,
      stars: reviewToUpdate.stars,
      createdAt: reviewToUpdate.createdAt,
      updatedAt: reviewToUpdate.updatedAt
    };

    res.json(updatedReview);
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ message: 'Something went wrong' });
  }
});
router.delete('/:reviewId', requireAuth, async (req, res) => {
  try {
    const { reviewId } = req.params;
    const userId = req.user.id;

    const review = await Review.findByPk(reviewId);
    if (!review) {
      return res.status(404).json({ message: "Review couldn't be found" });
    }

    if (review.userId !== userId) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    await review.destroy();
    res.json({ message: "Successfully deleted" });
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ message: 'Something went wrong' });
  }
});

module.exports = router;