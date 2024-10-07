//TicketController.js
const Ticket = require("../Models/TicketModel");

class TicketController {
  static async getAllTicketTypes(req, res, db) {
    try {
      const ticketTypes = await Ticket.getAllTicketTypes(db);
      res.status(200).json(ticketTypes);
    } catch (error) {
      console.error("Errore nel recupero delle tipologie di ticket:", error);
      res.status(500).send("Recupero delle tipologie dei ticket fallita");
    }
  }

  static async getProjectTicketOpen(req, res, db) {
    try {
      const ProjectId = req.query.ProjectId;

      const tickets = await Ticket.getProjectTicketOpen(db, ProjectId);
      res.status(200).json(tickets);
    } catch (error) {
      console.error("Errore nel recupero dei ticket aperti:", error);
      res.status(500).send("Recupero dei ticket fallita");
    }
  }

  static async openNewTicket(req, res, db) {
    try {
      const TicketData = req.body.TicketData;
      const CustomerId = req.session.account.CustomerId;
      await Ticket.openNewTicket(db, TicketData, CustomerId);
      res.status(200).send("Ticket aperto con successo");
    } catch (error) {
      console.error("Errore nell'apertura del ticket:", error);
      res.status(500).send("Creazione del ticket fallita");
    }
  }

  static async updateTicketStatus(req, res, db) {
    try {
      const { ProjectTicketId, TicketStatusId } = req.body; // Assuming IDs are passed in the request body
      await Ticket.updateTicketStatus(db, ProjectTicketId, TicketStatusId);
      res.status(200).send("Ticket status updated successfully");
    } catch (error) {
      console.error("Error updating ticket status:", error);
      res.status(500).send("Failed to update ticket status");
    }
  }
}

module.exports = TicketController;
