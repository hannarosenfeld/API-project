'use strict';
const bcrypt = require("bcryptjs");
// test
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Users';
    return queryInterface.bulkInsert(options, [
      {
        firstName: "Hanna",
        lastName: "Rosenfeld",
        email: 'hanna@user.io',
        username: 'Demo-lition',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: "Ian",
        lastName: "Christopher",
        email: 'user1@user.io',
        username: 'FakeUser1',
        hashedPassword: bcrypt.hashSync('password2')
      },
      {
        firstName: "Clara",
        lastName: "Timmerman",
        email: 'user2@user.io',
        username: 'FakeUser2',
        hashedPassword: bcrypt.hashSync('password3')
      },
      {
        firstName: "Demo",
        lastName: "User",
        email: 'demo@user.io',
        username: 'user',
        hashedPassword: bcrypt.hashSync('passwort')
      },
      {
        firstName: "Professor",
        lastName: "Richard",
        email: 'richard@lifeboat.io',
        username: 'professorB',
        hashedPassword: bcrypt.hashSync('passworttt')
      },
      {
        firstName: "Steph",
        lastName: "Witch",
        email: 'witch@lifeboat.io',
        username: 'whichwitch',
        hashedPassword: bcrypt.hashSync('passwortttt')
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Users';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      username: { [Op.in]: ['Demo-lition', 'FakeUser1', 'FakeUser2'] }
    }, {});
  }
};
