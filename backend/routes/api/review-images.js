const express = require('express');
const bcrypt = require('bcryptjs');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Op } = require("sequelize");

const router = express.Router();

const { User, Spot, ReviewImage, Review, Booking } = require('../../db/models')

router.delete('/:imageId', requireAuth, async (req, res, next) => {
    const { imageId } = req.params
    const { user } = req

    const image = await ReviewImage.findByPk(imageId)

    if (image) {
        const review = await Review.findOne({
            where: {
                id: image.reviewId
            }
        })
        if (user.id === review.userId) {
            image.destroy()
            res.json({ message: "Successfully deleted" })
        } else {
            res.statusCode = 403
            res.json({ message: "You must be the owner of the review in order to delete the image." })
        }
    } else {
        res.statusCode = 404
        res.json({ message: "Review Image couldn't be found" })
    }
})

module.exports = router;
