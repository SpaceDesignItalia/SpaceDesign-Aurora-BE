const express = require("express");
const router = express.Router();
const CalendarController = require("../../Controllers/CalendarController");
const authenticateMiddleware = require("../../middlewares/EmailService/Authentication/Authmiddleware");

const calendarGET = (db) => {
  router.get("/GetEventTags", authenticateMiddleware, (req, res) => {
    CalendarController.getEventTags(req, res, db);
  });

  router.get("/GetEventsByEmail", authenticateMiddleware, (req, res) => {
    CalendarController.getEventsByEmail(req, res, db);
  });

  router.get("/GetEventByEventId", authenticateMiddleware, (req, res) => {
    CalendarController.getEventByEventId(req, res, db);
  });

  return router;
};

module.exports = calendarGET;
