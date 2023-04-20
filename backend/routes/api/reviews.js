const express = require('express');
const bcrypt = require('bcryptjs');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Op } = require("sequelize");

const router = express.Router();

const { User, Spot, SpotImage, Review, ReviewImage } = require('../../db/models')

// Get all Spots by owned by current User
router.get('/current', requireAuth, async (req, res, next) => {
    const { user } = req;
    if (user) {
      const safeUser = {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        username: user.username,
      };

      const reviews = await Review.findAll({
        where: {
            userId: safeUser.id
        },
        include: ['User','Spot']
      })


      const response = []

      for (let review of reviews){
        review = review.toJSON()
        delete review.User.username
        delete review.Spot.createdAt
        delete review.Spot.updatedAt

        const spotImage = await SpotImage.findOne({
            where: {
                spotId: review.spotId
            }
        })

        const reviewImages = await ReviewImage.findAll({
            where: {
                reviewId: review.id
            }
        })

        const reviewImagesArr = []

        for (let image of reviewImages) {
            image = image.toJSON()
            delete image.reviewId
            delete image.updatedAt
            delete image.createdAt

            reviewImagesArr.push(image)
        }

        review.Spot.previewImage = spotImage.url
        review.ReviewImages = reviewImagesArr

        response.push(review)
      }

      return res.json({
        Reviews: response
      });
    }
})

module.exports = router;
