'use strict';
const bcrypt = require("bcryptjs");
// test
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Reviews';
    return queryInterface.bulkInsert(options, [
      {
        spotId: 3,
        userId: 1,
        review: "A hidden gem in the woods! Our stay at the modern tiny home was an absolute dream. Tucked away amidst the trees, this charming retreat offered a perfect blend of modern comfort and natural beauty. The sleek design and thoughtful layout of the tiny home maximized every inch of space without compromising on coziness. Waking up surrounded by the sights and sounds of the forest was a rejuvenating experience like no other. The outdoor deck provided the ideal spot for sipping morning coffee while immersing ourselves in the serene surroundings. If you're seeking a peaceful escape that seamlessly combines contemporary living with the tranquility of nature, this modern tiny home is a must-visit. Our time here was truly enchanting, leaving us refreshed and inspired.",
        stars: 4
      },
      {
        spotId: 1,
        userId: 2,
        review: "This A-frame gem exceeded all our expectations and left us with cherished memories.",
        stars: 3
      },
      {
        spotId: 1,
        userId: 3,
        review: "The unique architecture with its soaring ceilings and expansive windows filled the space with an abundance of natural light, creating a warm and inviting atmosphere.",
        stars: 5
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Reviews';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      spotId: { [Op.eq]: [1,3] }
    }, {});
  }
};
