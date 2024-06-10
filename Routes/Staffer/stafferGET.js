// stafferGET.js
const express = require("express");
const router = express.Router();
const StafferController = require("../../Controllers/StafferController");

const stafferGET = (db) => {
  // Definisci le route GET qui

  router.get("/GetAllStaffers", (req, res) => {
    StafferController.getAllStaffers(res, db);
  });
  return router; // Ritorna il router per consentire l'utilizzo da parte dell'app principale
};

module.exports = stafferGET;
