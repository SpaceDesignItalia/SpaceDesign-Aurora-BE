const Lead = require("../Models/LeadModel");

class LeadController {
  // Recupera tutti i leads
  static async getAllLeads(req, res, db) {
    try {
      const leads = await Lead.getAllLeads(db);
      res.status(200).json(leads);
    } catch (error) {
      console.error("Errore nel recupero dei lead:", error);
      res.status(500).send("Recupero dei lead fallito");
    }
  }

  static async getReadLeadsByMonth(req, res, db) {
    try {
      const leads = await Lead.getReadLeadsByMonth(db);
      res.status(200).json(leads);
    } catch (error) {
      console.error("Errore nel recupero dei lead:", error);
      res.status(500).send("Recupero dei lead fallito");
    }
  }

  static async getPendingLeadsByMonth(req, res, db) {
    try {
      const leads = await Lead.getPendingLeadsByMonth(db);
      res.status(200).json(leads);
    } catch (error) {
      console.error("Errore nel recupero dei lead:", error);
      res.status(500).send("Recupero dei lead fallito");
    }
  }

  // Recupera un lead per ID
  static async getLeadById(req, res, db) {
    const { id } = req.query;

    try {
      const lead = await Lead.getLeadById(db, id);
      res.status(200).json(lead);
    } catch (error) {
      console.error("Errore nel recupero del lead:", error);
      res.status(500).send("Recupero del lead fallito");
    }
  }

  static async searchLeadByCompany(req, res, db) {
    const company = req.query.Company;
    try {
      const leads = await Lead.searchLeadByCompany(db, company);
      res.status(200).json(leads);
    } catch (error) {
      console.error("Errore nella ricerca del lead:", error);
      res.status(500).send("Ricerca del lead fallita");
    }
  }

  // Recupera tutti gli oggetti
  static async getAllObjects(req, res, db) {
    try {
      const objects = await Lead.getAllObjects(db);
      res.status(200).json(objects);
    } catch (error) {
      console.error("Errore nel recupero degli oggetti:", error);
      res.status(500).send("Recupero degli oggetti fallito");
    }
  }

  // Recupera tutti gli intervalli
  static async getAllRanges(req, res, db) {
    try {
      const ranges = await Lead.getAllRanges(db);
      res.status(200).json(ranges);
    } catch (error) {
      console.error("Errore nel recupero degli intervalli:", error);
      res.status(500).send("Recupero degli intervalli fallito");
    }
  }

  static async getReadLeads(req, res, db) {
    try {
      const leads = await Lead.getReadLeads(db);
      res.status(200).json(leads);
    } catch (error) {
      console.error("Errore nel recupero dei lead:", error);
      res.status(500).send("Recupero dei lead fallito");
    }
  }

  // Gestisce l'invio del modulo di contatto
  static async contactFormSubmit(req, res, db) {
    const { name, email, company, object, budget, message } = req.body;

    try {
      await Lead.contactFormSubmit(
        db,
        name,
        email,
        company,
        object,
        budget,
        message
      );
      res.status(200).send("Richiesta inviata con successo");
    } catch (error) {
      console.error("Errore nell'invio della richiesta:", error);
      res.status(500).send("Invio della richiesta fallito");
    }
  }

  static async deleteLead(req, res, db) {
    const LeadId = req.query.LeadId;

    try {
      await Lead.deleteLead(db, LeadId);
      res.status(200).send("Lead eliminato con successo");
    } catch (error) {
      console.error("Errore nell'eliminazione del lead:", error);
      res.status(500).send("Eliminazione del lead fallita");
    }
  }
}

module.exports = LeadController;
