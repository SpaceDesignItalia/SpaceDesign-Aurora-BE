// stafferGET.js
const express = require("express");
const router = express.Router();
const CompanyController = require("../../Controllers/CompanyController");

const companyGET = (db) => {
  // Definisci le route GET qui

  router.get("/GetAllCompany", (req, res) => {
    CompanyController.getAllCompany(req, res, db);
  });

  router.get("/GetCompanyByIdAndName", (req, res) => {
    CompanyController.getCompanyByIdAndName(req, res, db);
  });

  router.get("/SearchCompanyByName", (req, res) => {
    CompanyController.searchCompanyByName(req, res, db);
  });

  router.get("/GetCompanyMembersById", (req, res) => {
    CompanyController.getCompanyMembersById(req, res, db);
  });
  return router; // Ritorna il router per consentire l'utilizzo da parte dell'app principale
};

module.exports = companyGET;
