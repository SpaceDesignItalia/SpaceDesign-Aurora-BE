// stafferGET.js
const express = require("express");
const router = express.Router();
const StafferController = require("../../Controllers/StafferController");

const stafferUPDATE = (db) => {
  // Definisci le route UPDATE qui

  router.put("/UpdateStaffer", (req, res) => {
    StafferController.updateStaffer(req, res, db);
  });
  return router; // Ritorna il router per consentire l'utilizzo da parte dell'app principale
};

module.exports = stafferUPDATE;
