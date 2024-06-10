// stafferGET.js
const express = require("express");
const router = express.Router();
const CompanyController = require("../../Controllers/CompanyController");

const companyDELETE = (db) => {
  // Definisci le route GET qui
  router.delete("/DeleteCompany", (req, res) => {
    CompanyController.deleteCompany(req, res, db);
  });
  return router; // Ritorna il router per consentire l'utilizzo da parte dell'app principale
};

module.exports = companyDELETE;
