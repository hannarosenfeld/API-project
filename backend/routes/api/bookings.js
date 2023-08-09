// test
const express = require('express');
const bcrypt = require('bcryptjs');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Op } = require("sequelize");

const router = express.Router();

const { User, Spot, SpotImage, Review, Booking } = require('../../db/models')


router.get('/current', requireAuth, async (req, res, next) => {
    console.log("🌎 in route")
    const { user } = req

    const userObj = await User.findByPk(user.id)

    const bookings = await Booking.findAll({
        where: {
            userId: userObj.id
        }
    })
    console.log("⛅️ bookings", bookings)
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

router.delete('/:bookingId', requireAuth, async (req, res, next) => {
    const { bookingId } = req.params
    const { user } = req

    const booking = await Booking.findByPk(bookingId)


    if (booking) {
        const spot = await Spot.findOne({
            where: {
                id: booking.spotId
            }
        })
        console.log("spot.id", spot.id, "user.id", user.id, "booking.userId", booking.userId)
        if (spot.ownerId === user.id || booking.userId === user.id) {
            const startDate = new Date(booking.startDate)
            const endDate = new Date(booking.endDate)

            if (startDate < new Date() && endDate > new Date() ) {
                res.statusCode = 403
                return res.json({ message: "Bookings that have been started can't be deleted" })
            }

            booking.destroy()
            res.json({ message: "Successfully deleted" })
        } else {
            res.statusCode = 403
            res.json({ message: "You must be the owner of this booking or the spot in order to delete it."})
        }
    } else {
        res.statusCode = 404
        res.json({ message: "Booking couldn't be found" })
    }
})

module.exports = router;
