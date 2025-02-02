// stafferGET.js
const express = require("express");
const router = express.Router();
const CompanyController = require("../../Controllers/CompanyController");
const authenticateMiddleware = require("../../middlewares/Authentication/Authmiddleware");

const companyUPDATE = (db) => {
  // Definisci le route GET qui

  router.put("/UpdateCompanyData", authenticateMiddleware, (req, res) => {
    CompanyController.updateCompanyData(req, res, db);
  });

  return router; // Ritorna il router per consentire l'utilizzo da parte dell'app principale
};

module.exports = companyUPDATE;
