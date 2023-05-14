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
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nisi mi, tempor in ligula a, blandit pulvinar ligula. Vestibulum auctor ante id ante viverra convallis. Donec sapien nibh, porta non tincidunt ac, tincidunt congue lectus. Fusce orci sapien, viverra non aliquet vitae, ullamcorper id sapien. Proin euismod sem ante, vitae blandit ante mollis id. Donec blandit mi a nunc tincidunt ultrices. In in ligula eu turpis placerat consectetur eget nec tortor. In sed augue sit amet lorem eleifend pharetra. Sed in lorem sit amet lectus consequat efficitur nec a lacus. Donec vel libero non urna condimentum ullamcorper. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nullam luctus dui non augue pretium tincidunt. Nulla auctor orci eu tempor auctor. Fusce fringilla facilisis risus. Sed bibendum non diam non pulvinar. Quisque posuere nibh id dui eleifend, et tincidunt eros congue.",
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
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nisi mi, tempor in ligula a, blandit pulvinar ligula. Vestibulum auctor ante id ante viverra convallis. Donec sapien nibh, porta non tincidunt ac, tincidunt congue lectus. Fusce orci sapien, viverra non aliquet vitae, ullamcorper id sapien. Proin euismod sem ante, vitae blandit ante mollis id. Donec blandit mi a nunc tincidunt ultrices. In in ligula eu turpis placerat consectetur eget nec tortor. In sed augue sit amet lorem eleifend pharetra. Sed in lorem sit amet lectus consequat efficitur nec a lacus. Donec vel libero non urna condimentum ullamcorper. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nullam luctus dui non augue pretium tincidunt. Nulla auctor orci eu tempor auctor. Fusce fringilla facilisis risus. Sed bibendum non diam non pulvinar. Quisque posuere nibh id dui eleifend, et tincidunt eros congue.",
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
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nisi mi, tempor in ligula a, blandit pulvinar ligula. Vestibulum auctor ante id ante viverra convallis. Donec sapien nibh, porta non tincidunt ac, tincidunt congue lectus. Fusce orci sapien, viverra non aliquet vitae, ullamcorper id sapien. Proin euismod sem ante, vitae blandit ante mollis id. Donec blandit mi a nunc tincidunt ultrices. In in ligula eu turpis placerat consectetur eget nec tortor. In sed augue sit amet lorem eleifend pharetra. Sed in lorem sit amet lectus consequat efficitur nec a lacus. Donec vel libero non urna condimentum ullamcorper. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nullam luctus dui non augue pretium tincidunt. Nulla auctor orci eu tempor auctor. Fusce fringilla facilisis risus. Sed bibendum non diam non pulvinar. Quisque posuere nibh id dui eleifend, et tincidunt eros congue.",
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
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nisi mi, tempor in ligula a, blandit pulvinar ligula. Vestibulum auctor ante id ante viverra convallis. Donec sapien nibh, porta non tincidunt ac, tincidunt congue lectus. Fusce orci sapien, viverra non aliquet vitae, ullamcorper id sapien. Proin euismod sem ante, vitae blandit ante mollis id. Donec blandit mi a nunc tincidunt ultrices. In in ligula eu turpis placerat consectetur eget nec tortor. In sed augue sit amet lorem eleifend pharetra. Sed in lorem sit amet lectus consequat efficitur nec a lacus. Donec vel libero non urna condimentum ullamcorper. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nullam luctus dui non augue pretium tincidunt. Nulla auctor orci eu tempor auctor. Fusce fringilla facilisis risus. Sed bibendum non diam non pulvinar. Quisque posuere nibh id dui eleifend, et tincidunt eros congue.",
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
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nisi mi, tempor in ligula a, blandit pulvinar ligula. Vestibulum auctor ante id ante viverra convallis. Donec sapien nibh, porta non tincidunt ac, tincidunt congue lectus. Fusce orci sapien, viverra non aliquet vitae, ullamcorper id sapien. Proin euismod sem ante, vitae blandit ante mollis id. Donec blandit mi a nunc tincidunt ultrices. In in ligula eu turpis placerat consectetur eget nec tortor. In sed augue sit amet lorem eleifend pharetra. Sed in lorem sit amet lectus consequat efficitur nec a lacus. Donec vel libero non urna condimentum ullamcorper. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nullam luctus dui non augue pretium tincidunt. Nulla auctor orci eu tempor auctor. Fusce fringilla facilisis risus. Sed bibendum non diam non pulvinar. Quisque posuere nibh id dui eleifend, et tincidunt eros congue.",
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
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nisi mi, tempor in ligula a, blandit pulvinar ligula. Vestibulum auctor ante id ante viverra convallis. Donec sapien nibh, porta non tincidunt ac, tincidunt congue lectus. Fusce orci sapien, viverra non aliquet vitae, ullamcorper id sapien. Proin euismod sem ante, vitae blandit ante mollis id. Donec blandit mi a nunc tincidunt ultrices. In in ligula eu turpis placerat consectetur eget nec tortor. In sed augue sit amet lorem eleifend pharetra. Sed in lorem sit amet lectus consequat efficitur nec a lacus. Donec vel libero non urna condimentum ullamcorper. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nullam luctus dui non augue pretium tincidunt. Nulla auctor orci eu tempor auctor. Fusce fringilla facilisis risus. Sed bibendum non diam non pulvinar. Quisque posuere nibh id dui eleifend, et tincidunt eros congue.",
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
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nisi mi, tempor in ligula a, blandit pulvinar ligula. Vestibulum auctor ante id ante viverra convallis. Donec sapien nibh, porta non tincidunt ac, tincidunt congue lectus. Fusce orci sapien, viverra non aliquet vitae, ullamcorper id sapien. Proin euismod sem ante, vitae blandit ante mollis id. Donec blandit mi a nunc tincidunt ultrices. In in ligula eu turpis placerat consectetur eget nec tortor. In sed augue sit amet lorem eleifend pharetra. Sed in lorem sit amet lectus consequat efficitur nec a lacus. Donec vel libero non urna condimentum ullamcorper. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nullam luctus dui non augue pretium tincidunt. Nulla auctor orci eu tempor auctor. Fusce fringilla facilisis risus. Sed bibendum non diam non pulvinar. Quisque posuere nibh id dui eleifend, et tincidunt eros congue.",
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
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nisi mi, tempor in ligula a, blandit pulvinar ligula. Vestibulum auctor ante id ante viverra convallis. Donec sapien nibh, porta non tincidunt ac, tincidunt congue lectus. Fusce orci sapien, viverra non aliquet vitae, ullamcorper id sapien. Proin euismod sem ante, vitae blandit ante mollis id. Donec blandit mi a nunc tincidunt ultrices. In in ligula eu turpis placerat consectetur eget nec tortor. In sed augue sit amet lorem eleifend pharetra. Sed in lorem sit amet lectus consequat efficitur nec a lacus. Donec vel libero non urna condimentum ullamcorper. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nullam luctus dui non augue pretium tincidunt. Nulla auctor orci eu tempor auctor. Fusce fringilla facilisis risus. Sed bibendum non diam non pulvinar. Quisque posuere nibh id dui eleifend, et tincidunt eros congue.",
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
