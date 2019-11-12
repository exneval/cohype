"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "customers",
      [
        {
          name: "Isgik",
          identity_number: "jnkjnkjduolkjsd09809lnkd",
          phone_number: "099882778899",
          image: "http://fakeimage.com/fake.png",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "Nakjib",
          identity_number: "jnkjnkjduolkjsd09809lnkd",
          phone_number: "099882778899",
          image: "http://fakeimage.com/fake.png",
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("customers", null, {});
  }
};
