"use strict";
module.exports = (sequelize, DataTypes) => {
  const Customer = sequelize.define(
    "customer",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      identity_number: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      phone_number: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      image: DataTypes.STRING
    },
    {}
  );
  Customer.associate = function(models) {
    Customer.belongsToMany(models.room, {
      through: models.order,
      as: "rooms",
      foreignKey: "customer_id"
    });
  };
  return Customer;
};
