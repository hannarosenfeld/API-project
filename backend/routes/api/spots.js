const express = require('express');
const bcrypt = require('bcryptjs');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Op } = require("sequelize");

const router = express.Router();

const { User, Spot, SpotImage, Review } = require('../../db/models')

const validateSpot = [
    check('address')
      .exists({ checkFalsy: true })
      .notEmpty()
      .withMessage('Please provide a address.'),
      check('city')
      .exists({ checkFalsy: true })
      .notEmpty()
      .withMessage('Please provide a city.'),
      check('state')
      .exists({ checkFalsy: true })
      .notEmpty()
      .withMessage('Please provide a state.'),
      check('country')
      .exists({ checkFalsy: true })
      .notEmpty()
      .withMessage('Please provide a country.'),
      check('lat')
      .exists({ checkFalsy: true })
      .notEmpty()
      .withMessage('Please provide a latitude.'),
      check('lng')
      .exists({ checkFalsy: true })
      .notEmpty()
      .withMessage('Please provide a longitude.'),
      check('name')
      .exists({ checkFalsy: true })
      .notEmpty()
      .withMessage('Please provide a name.'),
      check('description')
      .exists({ checkFalsy: true })
      .notEmpty()
      .withMessage('Please provide a description.'),
      check('price')
      .exists({ checkFalsy: true })
      .notEmpty()
      .withMessage('Please provide a price.'),
    handleValidationErrors
  ];

// Create a Spot
router.post("/", validateSpot, async (req, res, next) => {
    const { user } = req;
    const {
        address,
        city,
        state,
        country,
        lat,
        lng,
        name,
        description,
        price
    } = req.body;

    if (!user) res.json({error: "You must be logged in before you can create a new spot."})

    if (user ) {
    const spotUser = await User.findByPk(user.id)
    const newSpot = await Spot.create({
        ownerId: spotUser.id,
        address,
        city,
        state,
        country,
        lat,
        lng,
        name,
        description,
        price
      })

      res.statusCode = 201
      res.json(newSpot)

     }
})

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
         if (previewImage.length) spot.previewImage = previewImage[0].url
         else spot.previewImage = null
         spot.avgRating = counter / avgRating

         arr.push(spot)
      }

      return res.json({
        spotsOwnedByCurrentUser: arr
      });
    } // else return res.json({ error: "An authenticated user is required for a successful response. Please log in." });
})

// Get details for a Spot from an id
router.get('/:spotId', async (req, res, next) => {
    const { spotId } = req.params
    let spot = await Spot.findOne({
        where: { id: spotId },
        attributes: { exclude: ["createdAt", "updatedAt"] },
    })

    if (spot) {
        const previewImage = await spot.getSpotImages({
            where: {
                preview: true
            }
           });
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

           if (previewImage.length) spot.previewImage = previewImage[0].url
           else spot.previewImage = null
           spot.avgRating = counter / avgRating
        res.json(spot)
    } else {
        res.status = 404
        res.json({error: "Couldn't find a Spot with the specified id."})
    }

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
       if (previewImage.length) spot.previewImage = previewImage[0].url
       else spot.previewImage = null
       spot.avgRating = counter / avgRating

       arr.push(spot)
    }

    res.json(arr)
})


module.exports = router;
