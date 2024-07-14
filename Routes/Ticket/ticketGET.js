// stafferGET.js
const express = require("express");
const router = express.Router();
const TicketController = require("../../Controllers/TicketController");

const ticketGET = (db) => {
  // Definisci le route GET qui

  router.get("/GetAllTicketTypes", (req, res) => {
    TicketController.getAllTicketTypes(req, res, db);
  });

  router.get("/GetProjectOpenTicket", (req, res) => {
    TicketController.getProjectTicketOpen(req, res, db);
  });
  return router; // Ritorna il router per consentire l'utilizzo da parte dell'app principale
};

module.exports = ticketGET;
