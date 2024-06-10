// controller/PermissionController.js
const Customer = require("../Models/CustomerModel");

class CustomerController {
  static async getAllCustomers(req, res, db) {
    try {
      const customers = await Customer.getAllCustomers(db);
      res.status(200).json(customers);
    } catch (error) {
      console.error("Errore nel recupero dei clienti:", error);
      res.status(500).send("Recupero dei clienti fallita");
    }
  }

  static async getCustomerById(req, res, db) {
    try {
      const CustomerId = req.query.CustomerId;
      const companies = await Customer.getCustomerById(db, CustomerId);
      res.status(200).json(companies);
    } catch (error) {
      console.error("Errore nel recupero del cliente:", error);
      res.status(500).send("Recupero del cliente fallita");
    }
  }

  static async getCompanyAssociatedByCustomerId(req, res, db) {
    try {
      const CustomerId = req.query.CustomerId;
      const companies = await Customer.getCompanyAssociatedByCustomerId(
        db,
        CustomerId
      );
      res.status(200).json(companies);
    } catch (error) {
      console.error("Errore nel recupero delle aziende:", error);
      res.status(500).send("Recupero delle aziende fallita");
    }
  }

  static async searchCustomerByEmail(req, res, db) {
    try {
      const CustomerEmail = req.query.CustomerEmail;
      const customers = await Customer.searchCustomerByEmail(db, CustomerEmail);
      res.status(200).json(customers);
    } catch (error) {
      console.error("Errore nel recupero dei clienti:", error);
      res.status(500).send("Recupero dei clienti fallita");
    }
  }

  static async addCustomer(req, res, db) {
    try {
      const customerData = req.body;
      await Customer.addCustomer(db, customerData);
      res.status(200).send("Cliente aggiunto con successo.");
    } catch (error) {
      console.error("Error nell'aggiungere il cliente:", error);
      res.status(500).send("Aggiunta del cliente fallita.");
    }
  }

  static async updateCustomerData(req, res, db) {
    try {
      const CustomerData = req.body.CustomerData;
      const OldCompanyId = req.body.OldCompanyId;
      await Customer.updateCustomerData(db, CustomerData, OldCompanyId);
      res.status(200).send("Cliente modificato con successo.");
    } catch (error) {
      console.error("Errore nel'aggiornamento del cliente:", error);
      res.status(500).send("Aggiornamento del cliente fallita");
    }
  }

  static async deleteCustomer(req, res, db) {
    try {
      const CustomerId = req.query.CustomerId;
      await Customer.deleteCustomer(db, CustomerId);
      res.status(200).send("Cliente eliminato con successo.");
    } catch (error) {
      console.error("Errore nell'eliminazione del cliente:", error);
      res.status(500).send("Eliminazione del cliente fallita");
    }
  }
}

module.exports = CustomerController;
