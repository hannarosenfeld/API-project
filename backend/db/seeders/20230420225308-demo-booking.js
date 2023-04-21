'use strict';
const bcrypt = require("bcryptjs");
// test
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Bookings';
    return queryInterface.bulkInsert(options, [
      {
        spotId: 3,
        userId: 1,
        startDate: new Date('2021-05-19'),
        endDate: new Date('2021-06-20'),
      },
      {
        spotId: 3,
        userId: 3,
        startDate: new Date('2021-11-19'),
        endDate: new Date('2021-11-19'),
      },
      {
        spotId: 1,
        userId: 3,
        startDate: new Date('2023-01-19'),
        endDate: new Date('2024-11-19'),
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Bookings';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      reviewId: { [Op.eq]: [1,2,3] }
    }, {});
  }
};
