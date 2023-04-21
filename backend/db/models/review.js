'use strict';
// test
const { Op } = require("sequelize");
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Review.belongsTo(
        models.Spot,
          { foreignKey: 'spotId' }
      );
      Review.belongsTo(
        models.User,
          { foreignKey: 'userId' }
      );
      Review.hasMany(
        models.ReviewImage,
        {
          foreignKey: 'reviewId',
          onDelete: 'CASCADE',
        },
      );
    }
  }
  Review.init({
    spotId: {
      type: DataTypes.INTEGER,
    },
    userId: DataTypes.INTEGER,
    review: {
      type: DataTypes.STRING,
      validate: {
        minLength(review) {
          console.log("review in validation, before if", review)
          if (review.length < 1) {
            console.log("review validation, this is review", review)
            throw new Error("Review text is required")
          }
        }
      }
    },
    stars: {
      type: DataTypes.INTEGER,
      validate: {
        [Op.between]: [1, 5],
        betweenOneAndFive(star) {
          if (star < 1 || star > 5) {
            throw new Error("Stars must be an integer from 1 to 5")
          }
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Review',
  });
  return Review;
};
