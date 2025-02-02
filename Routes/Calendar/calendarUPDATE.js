const express = require("express");
const router = express.Router();
const CalendarController = require("../../Controllers/CalendarController");
const authenticateMiddleware = require("../../middlewares/Authentication/Authmiddleware");

const calendarUPDATE = (db) => {
  router.put("/UpdateEvent", authenticateMiddleware, (req, res) => {
    CalendarController.updateEvent(req, res, db);
  });

  router.put(
    "/UpdateEventPartecipantStatus",
    authenticateMiddleware,
    (req, res) => {
      CalendarController.updateEventPartecipantStatus(req, res, db);
    }
  );

  return router;
};

module.exports = calendarUPDATE;
