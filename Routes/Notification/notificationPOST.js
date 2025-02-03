const express = require("express");
const router = express.Router();
const NotificationController = require("../../Controllers/NotificationController");
const authMiddleware = require("../../middlewares/Authentication/Authmiddleware");

const notificationPOST = (db) => {
  router.post("/ReadNotification", authMiddleware, (req, res) => {
    NotificationController.readNotification(db, req, res);
  });

  return router;
};

module.exports = notificationPOST;
