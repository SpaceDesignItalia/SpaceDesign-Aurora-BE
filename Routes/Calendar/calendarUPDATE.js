const express = require("express");
const router = express.Router();
const CalendarController = require("../../Controllers/CalendarController");
const authenticateMiddleware = require("../../middlewares/EmailService/Authentication/Authmiddleware");

const calendarUPDATE = (db) => {
  router.put("/UpdateEvent", authenticateMiddleware, (req, res) => {
    CalendarController.updateEvent(req, res, db);
  });

  return router;
};

module.exports = calendarUPDATE;
