const express = require("express");
const router = express.Router();
const calendarGET = require("./calendarGET");
const calendarPOST = require("./calendarPOST");
const calendarDELETE = require("./calendarDELETE");
const calendarUPDATE = require("./calendarUPDATE");

const Calendar = (db) => {
  router.use("/GET", calendarGET(db));
  router.use("/POST", calendarPOST(db));
  router.use("/DELETE", calendarDELETE(db));
  router.use("/UPDATE", calendarUPDATE(db));
  return router;
};

module.exports = Calendar;
