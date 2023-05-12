'use strict';
const bcrypt = require("bcryptjs");
// test
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
        address: "123 Disney Lane",
        city: "San Francisco",
        state: "California",
        country: "United States of America",
        lat: 37.7645358,
        lng: -122.4730327,
        name: "App Academy",
        description: "Place where web developers are created",
        price: 123,
      },
      {
        ownerId: 1,
        address: "430 Belgrade St",
        city: "Philadelphia",
        state: "PA",
        country: "USA",
        lat: 39.97352483939225,
        lng: -75.13082652682759,
        name: "Hanna's Place",
        description: "This is my description.",
        price: 233
      },
      {
        ownerId: 2,
        address: "262 Bundy Rd",
        city: "Ithaca",
        state: "NY",
        country: "USA",
        lat: 42.45988484015986,
        lng: -76.56026989999796,
        name: "Ian's Place",
        description: "This is a description.",
        price: 322
      },
      {
        ownerId: 1,
        address: "111 Oi Rd",
        city: "Detroit",
        state: "MI",
        country: "USA",
        lat: 42.32893691888589,
        lng: -83.07740481801518,
        name: "Michigan Central",
        description: "This is a description.",
        price: 322
      },
      {
        ownerId: 3,
        address: "Cool Rd",
        city: "Joshua Tree",
        state: "CA",
        country: "USA",
        lat: 42.32893691888589,
        lng: -83.07740481801518,
        name: "Joshua Tree Desert Home",
        description: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?.",
        price: 555
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Spots';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      ownerId: { [Op.eq]: [1, 2] }
    }, {});
  }
};
