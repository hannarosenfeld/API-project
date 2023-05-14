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
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-53343429/original/5b2e650f-f818-42f7-9488-c36288e6c30a.jpeg",
        preview: true
      },
      {
        spotId: 2,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-53343429/original/b9eb1d6d-a44b-42dd-b12d-83795d8fdd1e.jpeg",
        preview: true
      },
      {
        spotId: 2,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-53343429/original/7747d027-350a-4f4b-bc3f-ff1d1b10266a.jpeg",
        preview: true
      },
      {
        spotId: 2,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-53343429/original/9fa3244f-9a89-4ed1-ab40-5bdd386149e4.jpeg",
        preview: true
      },
      {
        spotId: 2,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-53343429/original/387ea58b-f01a-4634-81d8-989c68354218.jpeg",
        preview: true
      },

      {
        spotId: 3,
        url: "https://a0.muscache.com/im/pictures/18986897-702f-416d-958e-9627e6c9f72b.jpg",
        preview: true
      },
      {
        spotId: 3,
        url: "https://a0.muscache.com/im/pictures/e7153592-7584-4d94-a906-e993402bb996.jpg",
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

      {
        spotId: 5,
        url: "https://a0.muscache.com/im/pictures/2f82929d-9cc9-421a-a964-6740a01b8960.jpg",
        preview: true
      },
      {
        spotId: 5,
        url: "https://a0.muscache.com/im/pictures/d440eb2b-777c-4fd7-9532-e5a6f5681ea9.jpg",
        preview: false
      },
      {
        spotId: 5,
        url: "https://a0.muscache.com/im/pictures/9cf39d24-8304-42d8-b95d-710e8cda4035.jpg",
        preview: false
      },
      {
        spotId: 5,
        url: "https://a0.muscache.com/im/pictures/e9dd7c63-7290-46b2-85e1-ea90bd513ce3.jpg",
        preview: false
      },
      {
        spotId: 5,
        url: "https://a0.muscache.com/im/pictures/94fc506a-a3a5-4222-b83f-d0342540e389.jpg",
        preview: false
      },

      {
        spotId: 6,
        url: "https://a0.muscache.com/im/pictures/d118efbb-8f78-4d07-a00b-45dfdb9d4410.jpg",
        preview: true
      },
      {
        spotId: 6,
        url: "https://a0.muscache.com/im/pictures/1580ade2-a2d6-4ee4-b946-a84d23578511.jpg",
        preview: false
      },
      {
        spotId: 6,
        url: "https://a0.muscache.com/im/pictures/ca9725e8-03fc-46b3-9379-c9b8833b0673.jpg",
        preview: false
      },
      {
        spotId: 6,
        url: "https://a0.muscache.com/im/pictures/10460f3d-19f2-4b35-8dc4-49943f6cfc81.jpg",
        preview: false
      },
      {
        spotId: 6,
        url: "https://a0.muscache.com/im/pictures/37e8277d-8ec0-458c-a4a2-2632fa8d490a.jpg",
        preview: false
      },
      // Richards Place
      {
        spotId: 7,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-786959616046460308/original/a72daf1a-2a83-44b3-b68f-2a0ab9b487a1.jpeg",
        preview: true
      },
      {
        spotId: 7,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-786959616046460308/original/64f80cfc-bd73-4f51-9a06-32a796445d69.jpeg",
        preview: false
      },
      {
        spotId: 7,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-786959616046460308/original/54a28472-36a0-448d-abd9-b76022335e44.jpeg",
        preview: false
      },
      {
        spotId: 7,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-786959616046460308/original/20053b38-01ce-4e80-8935-52287f91bf6c.jpeg",
        preview: false
      },
      {
        spotId: 7,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-786959616046460308/original/e11705f5-fb25-432b-8c29-8648154f9dcd.jpeg",
        preview: false
      },

      {
        spotId: 8,
        url: "https://a0.muscache.com/im/pictures/airflow/Hosting-1197834/original/2c2cf7d3-cfa7-46f6-b9d7-cfd88fef90eb.jpg",
        preview: true
      },
      {
        spotId: 8,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-1197834/original/2b0a6a64-a676-452d-910b-e9195a6c36ae.jpeg",
        preview: false
      },
      {
        spotId: 8,
        url: "https://a0.muscache.com/im/pictures/airflow/Hosting-1197834/original/6c3894de-ee68-4b50-b797-ee6aa2a14222.jpg",
        preview: false
      },
      {
        spotId: 8,
        url: "https://a0.muscache.com/im/pictures/airflow/Hosting-1197834/original/9d02f67c-2352-4b56-98d9-b975a8272f4c.jpg",
        preview: false
      },
      {
        spotId: 8,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-1197834/original/64124018-b7b9-4d13-ae01-f16ed0112b2c.jpeg",
        preview: false
      },


      // Stephs House
      // {
      //   spotId: 9,
      //   url: "https://scontent-ord5-1.xx.fbcdn.net/v/t39.30808-6/345615188_1425120031594977_8985510951983231655_n.jpg",
      //   preview: true
      // },
      // {
      //   spotId: 9,
      //   url: "https://scontent-ord5-2.xx.fbcdn.net/v/t39.30808-6/345618423_281527130993345_7760325795135431114_n.jpg",
      //   preview: false
      // },
      // {
      //   spotId: 9,
      //   url: "https://scontent-ord5-1.xx.fbcdn.net/v/t39.30808-6/345469637_168235099231823_4275824232279880508_n.jpg",
      //   preview: false
      // },
      // {
      //   spotId: 9,
      //   url: "https://scontent-ord5-2.xx.fbcdn.net/v/t39.30808-6/345630275_1598326970578291_5813293460876944142_n.jpg",
      //   preview: false
      // },
      // {
      //   spotId: 9,
      //   url: "https://scontent-ord5-2.xx.fbcdn.net/v/t39.30808-6/345272453_222954250370159_5120235918828661230_n.jpg",
      //   preview: false
      // },


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
