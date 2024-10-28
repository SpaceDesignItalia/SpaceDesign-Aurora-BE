const express = require("express");
const router = express.Router();
const CustomerController = require("../../Controllers/CustomerController");
const authenticateMiddleware = require("../../middlewares/EmailService/Authentication/Authmiddleware");

const companyGET = (db) => {
  // Definisci le route GET qui

  router.get("/GetAllCustomers", authenticateMiddleware, (req, res) => {
    CustomerController.getAllCustomers(req, res, db);
  });

  router.get("/GetCustomerById", authenticateMiddleware, (req, res) => {
    CustomerController.getCustomerById(req, res, db);
  });

  router.get(
    "/GetCompanyAssociatedByCustomerId",
    authenticateMiddleware,
    (req, res) => {
      CustomerController.getCompanyAssociatedByCustomerId(req, res, db);
    }
  );

  router.get("/SearchCustomerByEmail", authenticateMiddleware, (req, res) => {
    CustomerController.searchCustomerByEmail(req, res, db);
  });

  router.get("/SearchCustomerByName", authenticateMiddleware, (req, res) => {
    CustomerController.searchCustomerByName(req, res, db);
  });

  router.get("/SearchCustomerBySurname", authenticateMiddleware, (req, res) => {
    CustomerController.searchCustomerBySurname(req, res, db);
  });

  router.get(
    "/SearchCustomerByPhoneNumber",
    authenticateMiddleware,
    (req, res) => {
      CustomerController.searchCustomerByPhoneNumber(req, res, db);
    }
  );

  return router; // Ritorna il router per consentire l'utilizzo da parte dell'app principale
};

module.exports = companyGET;
