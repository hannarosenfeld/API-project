const express = require('express');
const bcrypt = require('bcryptjs');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Op } = require("sequelize");

const router = express.Router();

const { User, Spot, SpotImage, Review, Booking } = require('../../db/models')


router.get('/current', requireAuth, async (req, res, next) => {
    const { user } = req

    const userObj = await User.findByPk(user.id)

    const bookings = await Booking.findAll({
        where: {
            userId: userObj.id
        }
    })

    res.json(bookings)

})



module.exports = router;
