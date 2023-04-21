'use strict';
const bcrypt = require("bcryptjs");
// test
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'SpotImages';
    return queryInterface.bulkInsert(options, [
      {
        spotId: 1,
        url: "https://thirdeyetraveller.com/wp-content/uploads/CRAIGIEVARCASTLE-13-of-17.jpg",
        preview: true
      },
      {
        spotId: 2,
        url: "https://blog.norwegianreward.com/wp-content/uploads/2019/11/norwegian-stave-churches-Borgund-flickr-Stevan-Nicholas-872x872.jpg",
        preview: true
      },
      {
        spotId: 3,
        url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_pb_VAg5ZpeubyHUj-ysCOAEjNWM4TIb-g8ckmT2j9jvp9phgkiE3jbMPRxPjG11FfSI&usqp=CAU",
        preview: true
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'SpotImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      spotId: { [Op.eq]: [1, 2] }
    }, {});
  }
};
