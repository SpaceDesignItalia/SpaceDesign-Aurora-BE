// stafferGET.js
const express = require("express");
const router = express.Router();
const StafferController = require("../../Controllers/StafferController");
const authenticateMiddleware = require("../../middlewares/EmailService/Authentication/Authmiddleware");

const stafferGET = (db) => {
  // Definisci le route GET qui

  router.get("/GetAllStaffers", authenticateMiddleware, (req, res) => {
    StafferController.getAllStaffers(res, db);
  });

  router.get("/GetStafferById", authenticateMiddleware, (req, res) => {
    StafferController.getStafferById(req, res, db);
  });

  router.get("/GetStafferRoleById", authenticateMiddleware, (req, res) => {
    StafferController.getStafferRoleById(req, res, db);
  });

  router.get("/SearchStafferByEmail", authenticateMiddleware, (req, res) => {
    StafferController.searchStafferByEmail(req, res, db);
  });
  return router; // Ritorna il router per consentire l'utilizzo da parte dell'app principale
};

module.exports = stafferGET;
