// stafferGET.js
const express = require("express");
const router = express.Router();
const CompanyController = require("../../Controllers/CompanyController");
const authenticateMiddleware = require("../../middlewares/Authentication/Authmiddleware");

const companyPOST = (db) => {
  // Definisci le route GET qui

  router.post("/AddCompany", authenticateMiddleware, (req, res) => {
    CompanyController.addCompany(req, res, db);
  });

  return router; // Ritorna il router per consentire l'utilizzo da parte dell'app principale
};

module.exports = companyPOST;
