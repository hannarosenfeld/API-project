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

// Add an Image to a Review based on the Review's id
router.post('/:reviewId/images', requireAuth, async (req, res, next) => {
    const { reviewId } = req.params
    const { url } = req.body

    const review = await Review.findOne({
      where: {
        id: reviewId
      }
    })

    const reviewImages = await ReviewImage.findAll({
      where: {
        reviewId: review.id
      }
    })

    if (reviewImages.length >= 10) {
      res.statusCode = 403
      return res.json({ message: "Maximum number of images for this resource was reached" })
    }

    if (review) {
      const newImage = await ReviewImage.create({
        reviewId: review.id,
        url
      })

      newImage.save()

      const response = {
        id: newImage.id,
        url: newImage.url
      }

      res.statusCode = 200
      res.json(response)
    } else {
      res.statusCode = 404
      res.json({ message: "Review couldn't be found" })
    }
})

// Edit a Review
router.put('/:reviewId', requireAuth, async (req, res, next) => {
    const { reviewId } = req.params
    const { review, stars } = req.body

    const reviewToEdit = await Review.findByPk(reviewId)



    if (reviewToEdit) {
      reviewToEdit.review = review
      reviewToEdit.stars = stars

      try {
         await reviewToEdit.validate()
         console.log("after edit: ", review)
      } catch(err) {
        console.log("in the catch", review)
          err.status = 400
          next(err)
      }

      await reviewToEdit.save()
      console.log("before re.json", review)

      res.json(reviewToEdit)
    } else {
      res.statusCode = 404
      res.json({ message: "Review couldn't be found" })
    }
})

// Delete a Review
router.delete('/:reviewId', requireAuth, async (req, res, next) => {
    const { reviewId } = req.params

    const review = await Review.findByPk(reviewId)

    if (review) {
      review.destroy()
      res.json({ message: "Successfully deleted" })
    } else {
      res.statusCode = 404
      res.json({ message: "Review couldn't be found" })
    }
})


module.exports = router;
