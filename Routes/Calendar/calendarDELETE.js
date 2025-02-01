const express = require("express");
const router = express.Router();
const CalendarController = require("../../Controllers/CalendarController");
const authenticateMiddleware = require("../../middlewares/EmailService/Authentication/Authmiddleware");

const calendarDELETE = (db) => {
  router.delete(
    "/DeleteEventAttachment",
    authenticateMiddleware,
    (req, res) => {
      CalendarController.deleteEventAttachment(req, res, db);
    }
  );

  router.delete("/DeleteEvent", authenticateMiddleware, (req, res) => {
    CalendarController.deleteEvent(req, res, db);
  });

  return router;
};

module.exports = calendarDELETE;
