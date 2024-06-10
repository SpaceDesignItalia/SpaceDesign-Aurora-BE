// stafferGET.js
const express = require("express");
const router = express.Router();
const CustomerController = require("../../Controllers/CustomerController");

const customerUPDATE = (db) => {
  // Definisci le route GET qui

  router.put("/UpdateCustomerData", (req, res) => {
    CustomerController.updateCustomerData(req, res, db);
  });

  return router; // Ritorna il router per consentire l'utilizzo da parte dell'app principale
};

module.exports = customerUPDATE;
