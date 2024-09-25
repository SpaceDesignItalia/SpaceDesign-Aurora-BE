const express = require("express");
const router = express.Router();
const NotificationController = require("../../Controllers/NotificationController");
const authMiddleware = require("../../middlewares/EmailService/Authentication/Authmiddleware");

const notificationGET = (db) => {
  router.get("/GetAllNotifications", authMiddleware, (req, res) => {
    NotificationController.getAllNotifications(db, req, res);
  });

  return router;
};

module.exports = notificationGET;
