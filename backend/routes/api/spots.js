const express = require('express');
const bcrypt = require('bcryptjs');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Op } = require("sequelize");

const { Spot } = require('../../db/models');

const router = express.Router();

const { SpotImage, Review } = require('../../db/models')

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
       const avgRating = await Review.count({
        where: {
            spotId: {
                [Op.eq]: spot.id
            }
        }
       })

       spot = spot.toJSON()
       spot.previewImage = previewImage[0].url
       spot.avgRating = avgRating

       arr.push(spot)
    }

    res.json(arr)
})

module.exports = router;
