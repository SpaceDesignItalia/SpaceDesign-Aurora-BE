// stafferGET.js
const express = require("express");
const router = express.Router();
const TicketController = require("../../Controllers/TicketController");

const ticketPOST = (db) => {
  // Definisci le route POST qui
  router.post("/OpenNewTicket", (req, res) => {
    TicketController.openNewTicket(req, res, db);
  });
  return router; // Ritorna il router per consentire l'utilizzo da parte dell'app principale
};

module.exports = ticketPOST;
