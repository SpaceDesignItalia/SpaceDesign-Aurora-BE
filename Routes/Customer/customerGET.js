// stafferGET.js
const express = require("express");
const router = express.Router();
const CustomerController = require("../../Controllers/CustomerController");

const companyGET = (db) => {
  // Definisci le route GET qui

  router.get("/GetAllCustomers", (req, res) => {
    CustomerController.getAllCustomers(req, res, db);
  });

  router.get("/GetCustomerById", (req, res) => {
    CustomerController.getCustomerById(req, res, db);
  });

  router.get("/GetCompanyAssociatedByCustomerId", (req, res) => {
    CustomerController.getCompanyAssociatedByCustomerId(req, res, db);
  });

  router.get("/SearchCustomerByEmail", (req, res) => {
    CustomerController.searchCustomerByEmail(req, res, db);
  });

  return router; // Ritorna il router per consentire l'utilizzo da parte dell'app principale
};

module.exports = companyGET;
