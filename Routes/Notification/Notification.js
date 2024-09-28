// NotificationRoutes.js
const express = require("express");
const router = express.Router();
const notificationGET = require("./notificationGET");
const notificationDELETE = require("./notificationDELETE");
const notificationPOST = require("./notificationPOST");

const Notification = (db) => {
  router.use("/GET", notificationGET(db)); // Passa il database a notificationGET
  router.use("/DELETE", notificationDELETE(db)); // Passa il database a notification
  router.use("/POST", notificationPOST(db)); // Passa il database a notificationPOST
  return router;
};

module.exports = Notification;
