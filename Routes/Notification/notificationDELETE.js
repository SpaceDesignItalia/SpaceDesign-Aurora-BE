const express = require("express");
const router = express.Router();
const NotificationController = require("../../Controllers/NotificationController");
const authMiddleware = require("../../middlewares/Authentication/Authmiddleware");

const notificationDELETE = (db) => {
  router.delete("/DeleteNotification", authMiddleware, (req, res) => {
    NotificationController.deleteNotification(db, req, res);
  });

  router.delete(
    "/DeleteConversationNotifications",
    authMiddleware,
    (req, res) => {
      NotificationController.deleteConversationNotifications(db, req, res);
    }
  );

  return router;
};

module.exports = notificationDELETE;
