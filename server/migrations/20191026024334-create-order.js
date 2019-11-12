"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("orders", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      customer_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "customers",
          key: "id"
        },
        onUpdate: "cascade",
        onDelete: "cascade"
      },
      room_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "rooms",
          key: "id"
        },
        onUpdate: "cascade",
        onDelete: "cascade"
      },
      is_booked: {
        allowNull: false,
        type: Sequelize.BOOLEAN
      },
      is_done: {
        allowNull: false,
        type: Sequelize.BOOLEAN
      },
      duration: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      order_end_time: {
        allowNull: false,
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("orders");
  }
};
