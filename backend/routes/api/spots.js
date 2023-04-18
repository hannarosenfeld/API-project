const express = require('express');
const bcrypt = require('bcryptjs');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Spot } = require('../../db/models');

const router = express.Router();

const { SpotImage } = require('../../db/models')

// Get all Spots
router.get('/', async (req, res, next) => {
    const spots = await Spot.findAll({
        include: [
            {
                model: SpotImage,
//                attributes: ['url']
            },
        ]
    })


    const spotsList = [];

    spots.forEach(spot => {
        spotsList.push(spot.toJSON())
    })

    spotsList.forEach(spot => {
        spot.SpotImages.forEach(image => {
            if (image.preview === true) {
                spot.previewImage = image.url
            }
            if (spot.preview === 'false') {
                spot.previewImage = "couldn't find a image for this spot."
            }
            delete spot.SpotImages
        })
    })

    res.json(spotsList)
})

module.exports = router;
