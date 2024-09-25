// NotificationRoutes.js
const express = require("express");
const router = express.Router();
const notificationGET = require("./notificationGET");

const Notification = (db) => {
  router.use("/GET", notificationGET(db)); // Passa il database a notificationGET
  return router;
};

module.exports = Notification;
