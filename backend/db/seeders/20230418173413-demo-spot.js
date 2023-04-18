'use strict';
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Spots';
    return queryInterface.bulkInsert(options, [
      {
        ownerId: 1,
        address: "430 Belgrade St",
        city: "Philadelphia",
        state: "PA",
        country: "USA",
        lat: 39.97352483939225,
        lng: -75.13082652682759,
        name: "name",
        description: "This is my description.",
        price: 233
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Spots';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      name: { [Op.in]: ['name'] }
    }, {});
  }
};
