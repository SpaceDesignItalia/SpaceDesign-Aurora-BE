// permissionUPDATE.js
const express = require("express");
const router = express.Router();
const TicketController = require("../../Controllers/TicketController");
const authenticateMiddleware = require("../../middlewares/EmailService/Authentication/Authmiddleware");

const ticketUPDATE = (db) => {
  // Definisci le route UPDATE qui
  router.put("/UpdateTicketStatus", authenticateMiddleware, (req, res) => {
    TicketController.updateTicketStatus(req, res, db);
  });

  return router;
};

module.exports = ticketUPDATE;
