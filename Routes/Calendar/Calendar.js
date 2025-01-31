const express = require("express");
const router = express.Router();
const calendarGET = require("./calendarGET");
const calendarPOST = require("./calendarPOST");

const Calendar = (db) => {
  router.use("/GET", calendarGET(db));
  router.use("/POST", calendarPOST(db));
  return router;
};

module.exports = Calendar;
