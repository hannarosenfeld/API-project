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

// Edit a Booking
router.put('/:bookingId', requireAuth, async (req, res, next) => {
    const { bookingId } = req.params
    const { user } = req
    let { startDate, endDate } = req.body

    const booking = await Booking.findByPk(bookingId)
    const sessionUser = await User.findByPk(user.id)

    startDate = new Date(startDate)
    endDate = new Date(endDate)

    if (bookingId) {
        if (sessionUser.id === booking.userId) {
            if (startDate >= endDate) {
                res.statusCode = 400
                return res.json({ message: "endDate cannot be on or before startDate"})
            }
            if (endDate <= new Date()) {
                res.statusCode = 400
                return res.json({ message: "Past bookings can't be modified"})
            }

            if (startDate) booking.startDate = startDate
            if (endDate) booking.endDate = endDate

            res.json(booking)

        } else {
            res.statusCode = 403
            return res.json({message: "You must be the owner of this spot in order to edit it."})
        }
    } else {
        result.status = 404
        res.json({ message: "Booking does not exist"})
    }
})



module.exports = router;
