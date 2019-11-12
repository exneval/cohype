"use strict";
module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define(
    "order",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      customer_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      room_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      is_booked: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      is_done: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      duration: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      order_end_time: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      }
    },
    {}
  );
  Order.associate = function(models) {
    Order.belongsTo(models.customer, {
      foreignKey: "customer_id",
      sourceKey: "id"
    });
    Order.belongsTo(models.room, {
      foreignKey: "room_id",
      sourceKey: "id"
    });
  };
  return Order;
};
