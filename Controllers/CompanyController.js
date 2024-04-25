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

  static async addCompany(req, res, db) {
    try {
      const companyData = req.body;
      await Company.addCompany(companyData, db);
      res.status(200).send("Azienda aggiunta con successo.");
    } catch (error) {
      console.error("Error nell'aggiungere l'azienda:", error);
      res.status(500).send("Aggiunta dell'azienda fallita.");
    }
  }

  static async updateCompanyData(req, res, db) {
    try {
      const CompanyData = req.body.CompanyData;
      await Company.updateCompanyData(db, CompanyData);
      res.status(200).send("Azienda modificata con successo.");
    } catch (error) {
      console.error("Errore nel'aggiornamento dell'azienda:", error);
      res.status(500).send("Aggiornamento dell'azienda fallita");
    }
  }

  static async deleteCompany(req, res, db) {
    try {
      const CompanyId = req.query.CompanyId;
      await Company.deleteCompany(db, CompanyId);
      res.status(200).send("Azienda modificata con successo.");
    } catch (error) {
      console.error("Errore nel'aggiornamento dell'azienda:", error);
      res.status(500).send("Aggiornamento dell'azienda fallita");
    }
  }
}

module.exports = CompanyController;
