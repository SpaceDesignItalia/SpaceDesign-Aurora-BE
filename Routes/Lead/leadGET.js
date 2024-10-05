// leadGET.js
const express = require("express");
const router = express.Router();
const LeadController = require("../../Controllers/LeadController");
const authenticateMiddleware = require("../../middlewares/EmailService/Authentication/Authmiddleware");

const leadGET = (db) => {
  router.get("/GetAllLeads", authenticateMiddleware, (req, res) => {
    LeadController.getAllLeads(req, res, db);
  });

  router.get("/GetLeadById", authenticateMiddleware, (req, res) => {
    LeadController.getLeadById(req, res, db);
  });
  router.get("/GetObjects", authenticateMiddleware, (req, res) => {
    LeadController.getObjects(req, res, db);
  });

  router.get("/SearchLeadByCompany", authenticateMiddleware, (req, res) => {
    LeadController.searchLeadByCompany(req, res, db);
  });

  router.get("/GetRanges", authenticateMiddleware, (req, res) => {
    LeadController.getRanges(req, res, db);
  });

  return router;
};

module.exports = leadGET;
