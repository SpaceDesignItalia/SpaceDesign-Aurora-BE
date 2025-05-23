// controller/PermissionController.js
const Company = require("../Models/CompanyModel");

class CompanyController {
  static async getAllCompany(req, res, db) {
    try {
      const companies = await Company.getAllCompany(db);
      res.status(200).json(companies);
    } catch (error) {
      console.error("Errore nel recupero delle aziende:", error);
      res.status(500).send("Recupero delle aziende fallita");
    }
  }

  static async getCompanyByIdAndName(req, res, db) {
    try {
      const CompanyId = req.query.CompanyId;
      const CompanyName = req.query.CompanyName;
      const companies = await Company.getCompanyByIdAndName(
        db,
        CompanyId,
        CompanyName
      );
      res.status(200).json(companies);
    } catch (error) {
      console.error("Errore nel recupero delle aziende:", error);
      res.status(500).send("Recupero delle aziende fallita");
    }
  }

  static async getCompanyById(req, res, db) {
    try {
      const CompanyId = req.query.CompanyId;
      const companies = await Company.getCompanyById(db, CompanyId);
      res.status(200).json(companies);
    } catch (error) {
      console.error("Errore nel recupero delle aziende:", error);
      res.status(500).send("Recupero delle aziende fallita");
    }
  }

  static async searchCompanyByName(req, res, db) {
    try {
      const CompanyName = req.query.CompanyName;
      const companies = await Company.searchCompanyByName(db, CompanyName);
      res.status(200).json(companies);
    } catch (error) {
      console.error("Errore nel recupero delle aziende:", error);
      res.status(500).send("Recupero delle aziende fallita");
    }
  }

  static async getCompanyMembersById(req, res, db) {
    try {
      const CompanyId = req.query.CompanyId;
      const companyMembers = await Company.getCompanyMembersById(db, CompanyId);
      res.status(200).json(companyMembers);
    } catch (error) {
      console.error("Errore nel recupero dei membri:", error);
      res.status(500).send("Recupero dei membri fallita");
    }
  }

  static async addCompany(req, res, db) {
    try {
      const companyData = req.body;

      // Chiama il metodo per aggiungere l'azienda e gestisce il caso di duplicato
      await Company.addCompany(companyData, db);

      // Risposta di successo
      res.status(200).send("Azienda aggiunta con successo.");
    } catch (error) {
      console.error("Errore nell'aggiungere l'azienda:", error);

      // Se l'errore è relativo al nome duplicato, risponde con 409 Conflict
      if (error.message === "Un'azienda con questo nome esiste già.") {
        res.status(409).send("Esiste già un'azienda con questo nome.");
      } else {
        // Altrimenti, restituisce un errore generico
        res.status(500).send("Aggiunta dell'azienda fallita.");
      }
    }
  }

  static async updateCompanyData(req, res, db) {
    try {
      const CompanyData = req.body.CompanyData;

      // Esegui l'aggiornamento dell'azienda
      await Company.updateCompanyData(db, CompanyData);

      res.status(200).send("Azienda modificata con successo.");
    } catch (error) {
      if (
        error.message.includes(
          "Il nome dell'azienda è già utilizzato da un'altra azienda."
        )
      ) {
        return res.status(409).send(error.message); // Restituisce 409 se c'è un conflitto
      }

      console.error("Errore nell'aggiornamento dell'azienda:", error);
      res.status(500).send("Aggiornamento dell'azienda fallito");
    }
  }

  static async deleteCompany(req, res, db) {
    try {
      const CompanyId = req.query.CompanyId;
      await Company.deleteCompany(db, CompanyId);
      res.status(200).send("Azienda eliminata con successo.");
    } catch (error) {
      console.error("Errore nell'eliminazione dell'azienda:", error);
      res.status(500).send("Eliminazione dell'azienda fallita");
    }
  }
}

module.exports = CompanyController;
