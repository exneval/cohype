//jshint esversion:6

const models = require("../models");

const Room = models.room;
const Customer = models.customer;
const Order = models.order;

exports.storeRoom = (req, res) => {
  const { name } = req.body;

  Room.create({ name }).then(data => {
    if (data) {
      Room.findAll({
        order: [["id", "ASC"]],
        attributes: { exclude: ["createdAt", "updatedAt"] }
      }).then(item => {
        res.send(item);
      });
    } else {
      res.status(400).json({ message: "No room was added" });
    }
  });
};

exports.storeCustomer = (req, res) => {
  const { name, identity_number, phone_number, image } = req.body;

  Customer.create({
    name,
    identity_number,
    phone_number,
    image
  }).then(data => {
    if (data) {
      Customer.findAll({
        order: [["id", "ASC"]],
        attributes: { exclude: ["createdAt", "updatedAt"] }
      }).then(data => {
        res.send(data);
      });
    } else {
      res.status(400).json({ message: "No customer was added" });
    }
  });
};

const getCheckin = data => {
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

exports.storeCheckin = (req, res) => {
  const { customer_id, room_id, duration } = req.body;

  Order.findOne({
    where: { room_id, is_booked: true, is_done: false }
  }).then(item => {
    if (item) {
      res.status(400).json({ message: "Room already booked" });
    } else {
      const time = new Date();
      time.setMinutes(time.getMinutes() + duration);

      Order.create({
        customer_id,
        room_id,
        is_booked: true,
        is_done: false,
        duration,
        order_end_time: time
      }).then(data => {
        if (data) {
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
            res.send(getCheckin(data));
          });
        } else {
          res.status(400).json({ message: "No checkin was added" });
        }
      });
    }
  });
};
