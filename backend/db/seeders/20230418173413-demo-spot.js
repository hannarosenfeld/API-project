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
        description: "Discover the ultimate urban retreat in the heart of San Francisco. Nestled within an iconic A-frame building, this stunning rental offers a unique blend of architectural charm and modern comfort. Immerse yourself in the breathtaking cityscape through the expansive floor-to-ceiling windows that flood the space with natural light. Whether you're enjoying panoramic views of the city or cozied up by the fireplace, this A-frame sanctuary provides a one-of-a-kind living experience. Embrace the vibrant culture of San Francisco while enjoying the privacy and tranquility of your own A-frame oasis. Your dream rental awaits.",
        price: 123,
      },
      {
        ownerId: 1,
        address: "23 Rosa Street",
        city: "Tulum",
        state: "Quintana Roo",
        country: "Mexico",
        lat: 39.97352483939225,
        lng: -75.13082652682759,
        name: "Hanna's Place",
        description: "Escape to a haven of tranquility in the heart of Tulum, Mexico. This enchanting rental embodies the essence of simplicity and beauty, offering a serene retreat from the bustling world. Bathed in natural light, the space seamlessly blends indoor and outdoor living, creating a seamless connection with nature. Dive into relaxation in your own private oasis a charming outdoor pool glistening under the sun's embrace. Experience the magic of Tulum's vibrant culture while basking in the comfort of your serene sanctuary. Your idyllic getaway awaits in this hidden gem of simplicity and brightness.",
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
        description: "Experience minimalist luxury nestled in the enchanting forests of Ithaca. Our modern tiny house invites you to disconnect from the world and reconnect with nature. Surrounded by towering trees, this tranquil retreat offers a perfect blend of contemporary design and woodland serenity. Unplug and unwind in your cozy haven, where every inch is thoughtfully curated for comfort. Step outside onto your private deck and immerse yourself in the sights and sounds of the forest. Whether you're exploring nearby trails or simply savoring the stillness, this tiny house promises an unforgettable escape into the heart of nature.",
        price: 322
      },
      {
        ownerId: 1,
        address: "111 Oi Rd",
        city: "Ithaca",
        state: "NY",
        country: "USA",
        lat: 42.32893691888589,
        lng: -83.07740481801518,
        name: "Katya's Place",
        description: "Nestled in a tranquil setting, this cozy haven exudes warmth and character at every turn. From the rich wooden accents to the thoughtfully curated décor, every detail has been carefully chosen to create an ambiance of relaxed luxury.",
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
        description: "Our unique rental offers you a front-row seat to stunning sunsets, star-studded nights, and the iconic Joshua Tree National Park just moments away. Step inside to find a carefully designed space that blends rustic charm with contemporary style, providing you with a cozy retreat after a day of desert exploration.",
        price: 555
      },
      {
        ownerId: 3,
        address: "Fugazi Rd",
        city: "Elmira",
        state: "NY",
        country: "USA",
        lat: 42.32893691888589,
        lng: -83.07740481801518,
        name: "Cute little spot in Elmira",
        description: "Indulge in a world of comfort and style at our exceptional rental. Nestled in a serene location, this inviting retreat offers the perfect blend of elegance and relaxation. Immerse yourself in the beauty of your surroundings, unwind in style, and create cherished memories that will linger long after you leave. Your perfect getaway awaits.",
        price: 555
      },
      {
        ownerId: 5,
        address: "Lifeboat Rd",
        city: "Halifax",
        state: "NS",
        country: "Canada",
        lat: 42.32893691888589,
        lng: -83.07740481801518,
        name: "Cute little spot in Halifax",
        description: "Welcome to a sleek and stylish retreat amidst Halifax's snowy embrace. Our modern rental is your haven in the icy splendor, where contemporary design meets cozy luxury. Escape the cold and unwind in the warmth of thoughtfully crafted interiors. From frosty cityscapes to charming winter escapes, our rental is your gateway to the best of both worlds. Embrace the season with comfort and sophistication, right here in Halifax.",
        price: 555
      },
      {
        ownerId: 1,
        address: "Lifeboat Rd",
        city: "San Francisco",
        state: "CA",
        country: "USA",
        lat: 42.32893691888589,
        lng: -83.07740481801518,
        name: "Charming house close to train station",
        description: "Step into a world of relaxation and wonder at our exquisite rental. Nestled in a stunning location, this enchanting retreat promises an escape from the ordinary. Unwind, recharge, and create timeless memories in a space designed with your utmost comfort in mind. Your perfect getaway starts here.",
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
