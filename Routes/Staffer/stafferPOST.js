// stafferGET.js
const express = require("express");
const router = express.Router();
const StafferController = require("../../Controllers/StafferController");
const authenticateMiddleware = require("../../middlewares/EmailService/Authentication/Authmiddleware");

const stafferPOST = (db) => {
  // Definisci le route POST qui
  router.post("/AddStaffer", authenticateMiddleware, (req, res) => {
    StafferController.addNewStaffer(req, res, db);
  });
  return router; // Ritorna il router per consentire l'utilizzo da parte dell'app principale
};

module.exports = stafferPOST;
