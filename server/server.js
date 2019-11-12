//jshint esversion:6

require("dotenv").config();
require("express-group-routes");

const express = require("express");
const cors = require("cors");
const multer = require("multer");
const path = require("path");

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.fieldname);
  }
});

const upload = multer({
  storage,
  limits: {
    fileSize: 4 * 1024 * 1024
  }
});

const authController = require("./controllers/auth");
const getController = require("./controllers/get");
const postController = require("./controllers/post");
const putController = require("./controllers/put");

const { authenticated, authorized } = require("./middleware");

app.group("/api/v2", router => {
  router.post("/login", authController.login);
  router.post("/register", authController.register);

  router.get(
    "/user/:user_id/rooms",
    authenticated,
    authorized,
    getController.showRooms
  );
  router.get(
    "/user/:user_id/customers",
    authenticated,
    authorized,
    getController.showCustomers
  );
  router.get(
    "/user/:user_id/checkin",
    authenticated,
    authorized,
    getController.showCheckin
  );
  router.get(
    "/user/:user_id/profile",
    authenticated,
    authorized,
    getController.showProfile
  );

  router.post(
    "/user/:user_id/room",
    authenticated,
    authorized,
    postController.storeRoom
  );
  router.post(
    "/user/:user_id/customer",
    authenticated,
    authorized,
    postController.storeCustomer
  );
  router.post(
    "/user/:user_id/checkin",
    authenticated,
    authorized,
    postController.storeCheckin
  );

  router.put(
    "/user/:user_id/room/:room_id",
    authenticated,
    authorized,
    putController.updateRoom
  );
  router.put(
    "/user/:user_id/customer/:customer_id",
    authenticated,
    authorized,
    putController.updateCustomer
  );
  router.put(
    "/user/:user_id/order/:order_id",
    authenticated,
    authorized,
    putController.updateCheckout
  );
  router.put(
    "/user/:user_id/profile",
    authenticated,
    authorized,
    upload.single("avatar"),
    putController.updateProfile
  );
});

app.use((err, req, res, next) => {
  if (err.name === "UnauthorizedError") {
    res.status(401).json({ message: "You are not authorized." });
  } else {
    next(err);
  }
});

app.listen(port, () => console.log(`Listening on port ${port}!`));
