// stafferGET.js
const express = require("express");
const router = express.Router();
const StafferController = require("../../Controllers/StafferController");
const authenticateMiddleware = require("../../middlewares/Authentication/Authmiddleware");

const stafferDELETE = (db) => {
  // Definisci le route DELETE qui

  router.delete("/DeleteStaffer", authenticateMiddleware, (req, res) => {
    StafferController.deleteStaffer(req, res, db);
  });

  router.delete(
    "/DeleteAttendanceEmail",
    authenticateMiddleware,
    (req, res) => {
      StafferController.deleteAttendanceEmail(req, res, db);
    }
  );

  return router; // Ritorna il router per consentire l'utilizzo da parte dell'app principale
};

module.exports = stafferDELETE;
