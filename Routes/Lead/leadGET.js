// leadGET.js
const express = require("express");
const router = express.Router();
const LeadController = require("../../Controllers/LeadController");
const authenticateMiddleware = require("../../middlewares/Authentication/Authmiddleware");

const leadGET = (db) => {
  router.get("/GetAllLeads", authenticateMiddleware, (req, res) => {
    LeadController.getAllLeads(req, res, db);
  });

  router.get("/GetReadLeads", authenticateMiddleware, (req, res) => {
    LeadController.getReadLeads(req, res, db);
  });

  router.get("/GetReadLeadsByMonth", authenticateMiddleware, (req, res) => {
    LeadController.getReadLeadsByMonth(req, res, db);
  });

  router.get("/GetPendingLeadsByMonth", authenticateMiddleware, (req, res) => {
    LeadController.getPendingLeadsByMonth(req, res, db);
  });

  router.get("/GetLeadById", authenticateMiddleware, (req, res) => {
    LeadController.getLeadById(req, res, db);
  });
  router.get("/GetObjects", (req, res) => {
    LeadController.getObjects(req, res, db);
  });

  router.get("/SearchLeadByCompany", authenticateMiddleware, (req, res) => {
    LeadController.searchLeadByCompany(req, res, db);
  });

  router.get("/GetRanges", (req, res) => {
    LeadController.getRanges(req, res, db);
  });
  return router;
};

module.exports = leadGET;
