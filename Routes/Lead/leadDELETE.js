// leadDELETE.js
const express = require("express");
const router = express.Router();
const LeadController = require("../../Controllers/LeadController");
const authenticateMiddleware = require("../../middlewares/EmailService/Authentication/Authmiddleware");

const leadDELETE = (db) => {
  router.delete("/DeleteLeadById", authenticateMiddleware, (req, res) => {
    LeadController.deleteLead(req, res, db);
  });

  return router;
};

module.exports = leadDELETE;
