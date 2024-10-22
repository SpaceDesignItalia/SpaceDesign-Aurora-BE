// stafferGET.js
const express = require("express");
const router = express.Router();
const TicketController = require("../../Controllers/TicketController");
const authenticateMiddleware = require("../../middlewares/EmailService/Authentication/Authmiddleware");

const ticketGET = (db) => {
  // Definisci le route GET qui

  router.get("/GetAllTicketTypes", authenticateMiddleware, (req, res) => {
    TicketController.getAllTicketTypes(req, res, db);
  });

  router.get("/GetAllTicketStatusTypes", authenticateMiddleware, (req, res) => {
    TicketController.getAllTicketStatusTypes(req, res, db);
  });

  router.get("/GetProjectOpenTicket", authenticateMiddleware, (req, res) => {
    TicketController.getProjectTicketOpen(req, res, db);
  });
  return router; // Ritorna il router per consentire l'utilizzo da parte dell'app principale
};

module.exports = ticketGET;
