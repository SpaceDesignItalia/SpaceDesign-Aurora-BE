// stafferGET.js
const express = require("express");
const router = express.Router();
const CompanyController = require("../../Controllers/CompanyController");
const authenticateMiddleware = require("../../middlewares/Authentication/Authmiddleware");

const companyGET = (db) => {
  // Definisci le route GET qui

  router.get("/GetAllCompany", authenticateMiddleware, (req, res) => {
    CompanyController.getAllCompany(req, res, db);
  });

  router.get("/GetCompanyByIdAndName", authenticateMiddleware, (req, res) => {
    CompanyController.getCompanyByIdAndName(req, res, db);
  });

  router.get("/GetCompanyById", authenticateMiddleware, (req, res) => {
    CompanyController.getCompanyById(req, res, db);
  });

  router.get("/SearchCompanyByName", authenticateMiddleware, (req, res) => {
    CompanyController.searchCompanyByName(req, res, db);
  });

  router.get("/GetCompanyMembersById", authenticateMiddleware, (req, res) => {
    CompanyController.getCompanyMembersById(req, res, db);
  });
  return router; // Ritorna il router per consentire l'utilizzo da parte dell'app principale
};

module.exports = companyGET;
