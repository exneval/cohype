"use strict";
module.exports = (sequelize, DataTypes) => {
  const Room = sequelize.define(
    "room",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      }
    },
    {}
  );
  Room.associate = function(models) {
    Room.belongsToMany(models.customer, {
      through: models.order,
      as: "customers",
      foreignKey: "room_id"
    });
  };
  return Room;
};
