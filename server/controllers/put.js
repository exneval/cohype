//jshint esversion:6

const models = require("../models");

const Room = models.room;
const Customer = models.customer;
const Order = models.order;
const User = models.user;

exports.updateRoom = (req, res) => {
  const { room_id } = req.params;
  const { name } = req.body;

  Room.update(
    {
      name
    },
    {
      where: { id: room_id }
    }
  ).then(() => {
    Room.findAll({
      order: [["id", "ASC"]],
      attributes: { exclude: ["createdAt", "updatedAt"] }
    }).then(data => {
      res.send(data);
    });
  });
};

exports.updateCustomer = (req, res) => {
  const { customer_id } = req.params;
  const { name, identity_number, phone_number, image } = req.body;

  Customer.update(
    {
      name,
      identity_number,
      phone_number,
      image
    },
    {
      where: { id: customer_id }
    }
  ).then(() => {
    Customer.findAll({
      order: [["id", "ASC"]],
      attributes: { exclude: ["createdAt", "updatedAt"] }
    }).then(data => {
      res.send(data);
    });
  });
};

const getCheckout = data => {
  const newData = data.map(item => {
    const customer = item.customers.map(entry => {
      const newCustomer = {
        id: entry.id,
        name: entry.name,
        identity_number: entry.identity_number,
        phone_number: entry.phone_number,
        image: entry.image
      };
      return newCustomer;
    });
    const order = item.customers.map(entry => {
      const { id, is_booked, is_done, duration, order_end_time } = entry.order;
      const newOrder = {
        id,
        is_booked,
        is_done,
        duration,
        order_end_time
      };
      return newOrder;
    });
    const newItem = {
      id: item.id,
      name: item.name,
      customer: customer[0],
      order: order[0]
    };
    return newItem;
  });
  return newData;
};

exports.updateCheckout = (req, res) => {
  const { order_id } = req.params;

  Order.update(
    {
      is_booked: false,
      is_done: true
    },
    {
      where: { id: order_id, is_booked: true, is_done: false }
    }
  ).then(() => {
    Room.findAll({
      include: [
        {
          model: Customer,
          as: "customers",
          attributes: { exclude: ["createdAt", "updatedAt"] },
          through: {
            model: Order,
            where: { is_done: false },
            attributes: { exclude: ["createdAt", "updatedAt"] }
          }
        }
      ],
      order: [["id", "ASC"]],
      attributes: { exclude: ["createdAt", "updatedAt"] }
    }).then(data => {
      res.send(getCheckout(data));
    });
  });
};

exports.updateProfile = (req, res) => {
  const { user_id } = req.params;
  const avatarURI = process.env.BASE_URL + req.file.path;

  User.update(
    { avatarURI },
    {
      where: { id: user_id }
    }
  ).then(() => {
    User.findOne({
      where: { id: user_id },
      attributes: { exclude: ["createdAt", "updatedAt"] }
    }).then(data => {
      res.send(data);
    });
  });
};
