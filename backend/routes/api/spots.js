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
    const spots = await Spot.findAll()

    const arr = []

    for (let spot of spots) {
       const previewImage = await spot.getSpotImages({
        where: {
            preview: true
        }
       });

       spot = spot.toJSON()
       spot.previewImage = previewImage[0].url
       arr.push(spot)
    }

    res.json(arr)
})

module.exports = router;
