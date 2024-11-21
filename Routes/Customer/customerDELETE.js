// stafferGET.js
const express = require("express");
const router = express.Router();
const CustomerController = require("../../Controllers/CustomerController");
const authenticateMiddleware = require("../../middlewares/EmailService/Authentication/Authmiddleware");

const customerDELETE = (db) => {
  // Definisci le route GET qui
  router.delete("/DeleteCustomer", authenticateMiddleware, (req, res) => {
    CustomerController.deleteCustomer(req, res, db);
  });
  return router; // Ritorna il router per consentire l'utilizzo da parte dell'app principale
};

module.exports = customerDELETE;
