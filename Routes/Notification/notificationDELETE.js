const express = require("express");
const router = express.Router();
const NotificationController = require("../../Controllers/NotificationController");
const authMiddleware = require("../../middlewares/EmailService/Authentication/Authmiddleware");

const notificationDELETE = (db) => {
  router.delete("/DeleteNotification", authMiddleware, (req, res) => {
    NotificationController.deleteNotification(db, req, res);
  });

  return router;
};

module.exports = notificationDELETE;
