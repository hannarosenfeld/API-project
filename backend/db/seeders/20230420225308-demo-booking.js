'use strict';
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Bookings';
    return queryInterface.bulkInsert(options, [
      {
        spotId: 1,
        userId: 3,
        startDate: new Date('July 20, 24 20:17:40 GMT+00:00'),
        endDate: new Date('July 25, 24 20:17:40 GMT+00:00'),
      },
      {
        spotId: 3,
        userId: 1,
        startDate: new Date('2021-11-19'),
        endDate: new Date('2021-11-20'),
      },
      {
        spotId: 2,
        userId: 3,
        startDate: new Date('July 1, 24 20:17:40 GMT+00:00'),
        endDate: new Date('July 3, 24 20:17:40 GMT+00:00'),
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Bookings';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      reviewId: { [Op.eq]: [1] }
    }, {});
  }
};
