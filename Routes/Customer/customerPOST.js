// stafferGET.js
const express = require("express");
const router = express.Router();
const CustomerController = require("../../Controllers/CustomerController");
const authenticateMiddleware = require("../../middlewares/EmailService/Authentication/Authmiddleware");

const customerPOST = (db) => {
  // Definisci le route GET qui

  router.post("/AddCustomer", authenticateMiddleware, (req, res) => {
    CustomerController.addCustomer(req, res, db);
  });

  return router; // Ritorna il router per consentire l'utilizzo da parte dell'app principale
};

module.exports = customerPOST;
