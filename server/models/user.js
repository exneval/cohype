"use strict";
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "user",
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notEmpty: true,
          isUnique: (value, next) => {
            const self = this;

            User.findOne({ where: { username: value }, attributes: ["id"] })
              .then(user => {
                // Reject if a different user wants to use the same email
                if (user && self.id !== user.id) {
                  return next("Username address already in use");
                }
                return next();
              })
              .catch(err => {
                return next(err);
              });
          }
        }
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notEmpty: true,
          isEmail: true,
          isUnique: (value, next) => {
            const self = this;

            User.findOne({ where: { email: value }, attributes: ["id"] })
              .then(user => {
                // Reject if a different user wants to use the same email
                if (user && self.id !== user.id) {
                  return next("Email address already in use");
                }
                return next();
              })
              .catch(err => {
                return next(err);
              });
          }
        }
      },
      name: DataTypes.STRING,
      avatarURI: DataTypes.STRING
    },
    {}
  );
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};
