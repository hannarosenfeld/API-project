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
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-21947777/original/88b0decc-4045-4869-be82-0c858b8478d2.jpeg",
        preview: true
      },
      {
        spotId: 2,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-21947777/original/00050b16-294e-4563-ba7b-e861046e2390.jpeg",
        preview: true
      },
      {
        spotId: 2,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-21947777/original/41995620-0048-417e-b6b6-d761c5fdf9df.jpeg",
        preview: true
      },
      {
        spotId: 2,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-21947777/original/e4f6e012-4e07-4570-89e0-183ca5b3374e.jpeg",
        preview: true
      },
      {
        spotId: 2,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-21947777/original/d7473b35-6eed-4cab-9efb-3853dddac62f.jpeg",
        preview: true
      },

      {
        spotId: 3,
        url: "https://a0.muscache.com/im/pictures/18986897-702f-416d-958e-9627e6c9f72b.jpg",
        preview: true
      },
      {
        spotId: 3,
        url: "https://a0.muscache.com/im/pictures/10c0b70b-6617-4ec5-bc1a-3065e35b3f16.jpg",
        preview: true
      },
      {
        spotId: 3,
        url: "https://a0.muscache.com/im/pictures/10c0b70b-6617-4ec5-bc1a-3065e35b3f16.jpg",
        preview: true
      },
      {
        spotId: 3,
        url: "https://a0.muscache.com/im/pictures/75c4c8dd-cf23-43b4-8778-10172a01af39.jpg",
        preview: true
      },
      {
        spotId: 3,
        url: "https://a0.muscache.com/im/pictures/c7b0d18d-60bc-401a-8eb8-e2814f97416d.jpg",
        preview: true
      },


      {
        spotId: 4,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-53509299/original/e07ac9a7-a45f-474e-bbef-39abdf795e32.jpeg",
        preview: true
      },
      {
        spotId: 4,
        url: "https://a0.muscache.com/im/pictures/a312bd99-9705-4987-8293-44ba04319b46.jpg",
        preview: true
      },
      {
        spotId: 4,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-53509299/original/ad2f0047-f965-450e-bf05-0f159b74f558.png",
        preview: true
      },
            {
        spotId: 4,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-53509299/original/89cd95e7-8c2f-42ae-9d83-b74cb09cf212.jpeg",
        preview: true
      },
            {
        spotId: 4,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-53509299/original/a893754a-c0b5-4e69-b77b-80e9bb16ae9c.jpeg",
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
