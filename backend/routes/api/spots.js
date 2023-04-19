const express = require('express');
const bcrypt = require('bcryptjs');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Op } = require("sequelize");

const router = express.Router();

const { User, Spot, SpotImage, Review } = require('../../db/models')


// Get all Spots by owned by current User
router.get('/current', async (req, res, next) => {
    const { user } = req;
    if (user) {
      const safeUser = {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        username: user.username,
      };

      const spots = await Spot.findAll({
        where: {
            ownerId: safeUser.id
        }
      })

      const arr = []

      for (let spot of spots) {
         const previewImage = await spot.getSpotImages({
          where: {
              preview: true
          }
         });

         // get average star rating...
         const reviews = await Review.findAll()
         const avgRating = await Review.count({
              where: {
                  spotId: {
                      [Op.eq]: spot.id
                  }
              }
         })
         let counter = 0
         for (let review of reviews) {
          review = review.toJSON()
          counter = counter + review.stars
         }

         spot = spot.toJSON()
         spot.previewImage = previewImage[0].url
         spot.avgRating = counter / avgRating

         arr.push(spot)
      }

      return res.json({
        spotsOwnedByCurrentUser: arr
      });
    } else return res.json({ error: "An authenticated user is required for a successful response. Please log in." });
})

// Get all Spots
router.get('/', async (req, res, next) => {
    const spots = await Spot.findAll()

    const arr = []

    for (let spot of spots) {
       const previewImage = await spot.getSpotImages({
        where: {
            preview: true
        }
       });

       // get average star rating...
       const reviews = await Review.findAll()
       const avgRating = await Review.count({
            where: {
                spotId: {
                    [Op.eq]: spot.id
                }
            }
       })
       let counter = 0
       for (let review of reviews) {
        review = review.toJSON()
        counter = counter + review.stars
       }

       spot = spot.toJSON()
       spot.previewImage = previewImage[0].url
       spot.avgRating = counter / avgRating

       arr.push(spot)
    }

    res.json(arr)
})

// Returns all the spots owned (created) by the current user



module.exports = router;
