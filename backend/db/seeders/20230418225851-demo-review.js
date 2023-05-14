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
        review: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        stars: 4
      },
      {
        spotId: 1,
        userId: 2,
        review: "Phasellus nisi mi, tempor in ligula a, blandit pulvinar ligula.",
        stars: 3
      },
      {
        spotId: 1,
        userId: 3,
        review: "Vestibulum auctor ante id ante viverra convallis. Donec sapien nibh, porta non tincidunt ac, tincidunt congue lectus.",
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
