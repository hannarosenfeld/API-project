const express = require('express');
const bcrypt = require('bcryptjs');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Op } = require("sequelize");

const router = express.Router();

const { User, Spot, SpotImage, Review, ReviewImage } = require('../../db/models')


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
router.post("/", validateSpot, requireAuth, async (req, res, next) => {
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

//    if (!user) res.json({error: "You must be logged in before you can create a new spot."})

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

router.get('/:spotId/reviews', async (req, res, next) => {
    const { spotId } = req.params

    const spot = await Spot.findByPk(spotId)

    if (spot){
        const reviews = await Review.findAll({
            where: {
                spotId: spot.id
            },
            include: ["User", "ReviewImages"]
        })

        const response = []

        for (let review of reviews) {
            review = review.toJSON()
            console.log(review.User.username)
            delete review.User.username

            const reviewImagesArr = []
            const reviewImages = await ReviewImage.findAll({
                where: {
                    reviewId: review.id
                }
            })

            for (let image of reviewImages) {
                image = image.toJSON()
                delete image.createdAt
                delete image.updatedAt
                delete image.reviewId

                reviewImagesArr.push(image)
            }

            review.ReviewImages = reviewImagesArr

            response.push(review)
        }

        res.json({
            Reviews: response
        })
    } else {
        res.statusCode = 404
        res.json({ message : "Spot couldn't be found" })
    }
})

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
        Spots: arr
      });
    } // else return res.json({ error: "An authenticated user is required for a successful response. Please log in." });
})

// Get details for a Spot from an id
router.get('/:spotId', async (req, res, next) => {
    const { spotId } = req.params
    let spot = await Spot.findOne({
        where: { id: spotId },
    })

    if (spot) {
        const spotImages = await spot.getSpotImages({
            attributes: { exclude: ["createdAt", "updatedAt", "spotId"] },
           });
           const reviews = await Review.findAll({
            where: {
                spotId: spot.id
            }
           })

           const numReviews = await Review.count({
                where: {
                    spotId: {
                        [Op.eq]: spot.id
                    },
                },
           })

           let counter = 0
           for (let review of reviews) {
            review = review.toJSON()
            counter = counter + review.stars
           }

           const owner = await spot.getUser({
            attributes: { exclude: ["username"] },
           })

           spot = spot.toJSON()
           spot.numReviews = numReviews
           spot.avgStarRating = counter / numReviews
           if (spotImages.length) spot.spotImages = spotImages
           else spot.spotImages = null
           spot.Owner = owner

        res.json(spot)
    } else {
        res.statusCode = 404
        res.json({ message: "Spot couldn't be found" })
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

// Add an Image to a Spot based on the Spot's id
router.post('/:spotId/images', requireAuth, async (req, res, next) => {
    const { user } = req
    const { url , preview } = req.body
    const { spotId } = req.params
    const spot = await Spot.findByPk(spotId)

    if (spot) {
        if (spot.ownerId !== user.id) {
            res.statusCode = 403
            res.json({ "message": "You must be the owner of the spot in order to upload a picture." })
        }

        if (url, preview) {
        const newImage = await SpotImage.create({
            spotId: spot.id,
            url,
            preview
        })

        const responseObj = {}
        responseObj.id = newImage.id
        responseObj.url = newImage.url
        responseObj.preview = newImage.preview

        res.json({ responseObj })
    } else res.json({ error: "Please provide url and preview values." })
} else {
        res.statusCode = 404
        res.json({ message: "Spot couldn't be found" })
    }
})

// Edit a Spot
router.put('/:spotId', requireAuth, async (req, res, next) => {
    const { user } = req
    const { spotId } = req.params
    const spot = await Spot.findByPk(spotId)

    if (spot) {
        if (spot.ownerId !== user.id) {
            res.statusCode = 403
            res.json({ "message": "You must be the owner of this spot in order to update it." })
        }

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
        } = req.body

        if (address) spot.address = address
        if (city) spot.city = city
        if (state) spot.state = state
        if (country) spot.country
        if (lat) spot.lat
        if (lng) spot.lng
        if (name) spot.name = name
        if (description) spot.description = description
        if (price) spot.price = price

        try {
           await spot.validate()
        } catch(err) {
            err.status = 400
            next(err)
        }

        await spot.save()
        res.json(spot)
    } else {
        statusCode = 404
        res.json({ message: "Spot does not exist"})
    }
})

// Delete spot based on id
router.delete('/:spotId', requireAuth, async (req, res, next) => {
    const { user } = req
    const { spotId } = req.params
    const spot = await Spot.findByPk(spotId)

    if (spot) {
        if (spot.ownerId !== user.id) {
            res.statusCode = 403
            res.json({ "message": "You must be the owner of this spot in order to delete it." })
        }

        spot.destroy()
        res.json({ message : "Successfully deleted" })
    } else {
        statusCode = 404
        res.json({ message: "Spot couldn't be found" })
    }
})


module.exports = router;
