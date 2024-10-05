// leadPOST.js
const express = require("express");
const router = express.Router();
const LeadController = require("../../Controllers/LeadController");
const authenticateMiddleware = require("../../middlewares/EmailService/Authentication/Authmiddleware");

const leadPOST = (db) => {
  router.post("/ContactFormSubmit", authenticateMiddleware, (req, res) => {
    LeadController.contactFormSubmit(req, res, db);
  });
  return router;
};

module.exports = leadPOST;
