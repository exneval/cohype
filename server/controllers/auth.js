//jshint esversion:6

const Sequelize = require("sequelize");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const models = require("../models");
const User = models.user;

exports.login = (req, res) => {
  User.findOne({
    where: { username: req.body.username }
  }).then(user => {
    if (user) {
      const authorize = bcrypt.compareSync(req.body.password, user.password);

      if (authorize) {
        const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY);

        res.send({
          id: user.id,
          token
        });
      } else {
        res.status(401).send({ message: "Invalid username or email." });
      }
    } else {
      res.status(401).send({ message: "Invalid username or email." });
    }
  });
};

exports.register = (req, res) => {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(req.body.password, salt);

  User.create({
    username: req.body.username,
    password: hash,
    email: req.body.email
  })
    .then(user => {
      if (user) {
        const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY);

        res.send({
          id: user.id,
          token
        });
      }
    })
    .catch(Sequelize.ValidationError, err => {
      return res.status(406).send({ message: "Invalid username or email." });
    })
    .catch(err => {
      return res.status(400).send({
        message: err.message
      });
    });
};
