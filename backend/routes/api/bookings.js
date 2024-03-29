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
    const { user } = req

    const userObj = await User.findByPk(user.id)

    const bookings = await Booking.findAll({
        where: {
            userId: userObj.id
        }
    })
    res.json(bookings)
})

router.post('/current', requireAuth, async (req, res, next) => {
    const { user } = req;
    const { spotId, startDate, endDate } = req.body;

    try {
        // Check if the spot exists
        const spot = await Spot.findByPk(spotId);

        if (!spot) {
            res.status(404).json({ message: "Spot not found" });
            return;
        }

        // Validate startDate and endDate
        const parsedStartDate = new Date(startDate);
        const parsedEndDate = new Date(endDate);

        if (parsedStartDate >= parsedEndDate) {
            res.status(400).json({ message: "endDate cannot be on or before startDate" });
            return;
        }

        if (parsedStartDate <= new Date()) {
            res.status(400).json({ message: "Past dates are not allowed for booking" });
            return;
        }

        // Create the booking
        const booking = await Booking.create({
            spotId,
            userId: user.id,
            startDate: parsedStartDate,
            endDate: parsedEndDate,
        });

        res.status(201).json(booking);
    } catch (error) {
        console.error("Error creating booking:", error);
        res.status(500).json({ message: "An error occurred while creating the booking" });
    }
});


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
