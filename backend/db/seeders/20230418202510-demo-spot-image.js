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
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-39441496/original/8cf45f0a-7fa3-4fca-b530-6f959e03ae3d.jpeg",
        preview: true
      },
      {
        spotId: 1,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-39441496/original/4b085f5f-0bd8-4782-90e7-9922d55c3ee7.jpeg",
        preview: true
      },
      {
        spotId: 1,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-39441496/original/1f828058-88c6-4c05-82c0-f3dc1fdd1697.jpeg",
        preview: true
      },
      {
        spotId: 1,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-39441496/original/22394b65-8a8f-44c6-9e6c-dce35bd8af9f.jpeg",
        preview: true
      },
      {
        spotId: 1,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-39441496/original/f7b9b5c3-78b1-4866-b4d8-b5274f228c93.jpeg",
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
      {
        spotId: 4,
        url: "https://a0.muscache.com/im/pictures/9b1dac05-b810-46ea-8d35-f57072af1fe1.jpg",
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
