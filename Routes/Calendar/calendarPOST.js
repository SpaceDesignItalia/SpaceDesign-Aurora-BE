const express = require("express");
const router = express.Router();
const CalendarController = require("../../Controllers/CalendarController");
const authenticateMiddleware = require("../../middlewares/EmailService/Authentication/Authmiddleware");

const calendarPOST = (db) => {
  router.post("/AddEvent", authenticateMiddleware, (req, res) => {
    CalendarController.addEvent(req, res, db);
  });
  return router;
};

module.exports = calendarPOST;
