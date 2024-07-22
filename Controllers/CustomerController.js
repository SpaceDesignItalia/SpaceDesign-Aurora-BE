// controller/PermissionController.js
const EmailService = require("../middlewares/EmailService/EmailService");
const Customer = require("../Models/CustomerModel");
const path = require("path");
const fs = require("fs");

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
      const customer = await Customer.getCustomerById(db, CustomerId);
      res.status(200).json(customer);
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
      const customerData = req.body.CustomerData;
      console.log(req.body.CustomerData);
      await Customer.addCustomer(db, customerData);
      EmailService.sendCustomerWelcomeMail(
        customerData.CustomerEmail,
        customerData.CustomerName,
        customerData.CustomerSurname,
        customerData.CustomerPassword
      );
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

  static async settingsUpdateCustomerData(req, res, db) {
    try {
      const newCustomerData = JSON.parse(req.body.newCustomerData);
      const newProfilePic = req.file;
      const oldPhoto = req.body.oldPhoto;

      await Customer.settingsUpdateCustomer(db, newCustomerData, newProfilePic);

      req.session.account.CustomerName = newCustomerData.CustomerName;
      req.session.account.CustomerSurname = newCustomerData.CustomerSurname;
      req.session.account.CustomerEmail = newCustomerData.CustomerEmail;
      req.session.account.CustomerPhone = newCustomerData.CustomerPhone;
      if (newProfilePic !== undefined) {
        const fullFilePath = path.join(
          __dirname,
          "../public/profileIcons",
          oldPhoto
        );

        fs.unlink(fullFilePath, (err) => {
          if (err) {
            console.error("Error deleting file:", err);
          }
        });

        req.session.account.CustomerImageUrl = newProfilePic.filename;
      }

      res.status(200).send("Dipendente modificato con successo.");
    } catch (error) {
      console.error("Errore nella modifica del dipendente:", error);
      res.status(500).send("Modifica del dipendente fallita");
    }
  }

  static async updateCustomerPassword(req, res, db) {
    try {
      const changePasswordData = req.body.ChangePasswordData;

      const customer = await Customer.updateCustomerPassword(
        db,
        changePasswordData,
        req.session.account.CustomerId
      );

      if (!customer) {
        return res.status(401).send("Password errata.");
      }

      /* EmailService.sendPasswordChangedMail(
        customer.CustomerEmail,
        customer.CustomerName,
        customer.CustomerSurname
      ); */

      res.status(200).send("Password modificata con successo.");
    } catch (error) {
      console.error("Errore nella modifica della password:", error);
      res.status(500).send("Modifica della password fallita");
    }
  }

  static async deleteCustomer(req, res, db) {
    try {
      const CustomerData = req.query.CustomerData;
      await Customer.deleteCustomer(db, CustomerData);
      res.status(200).send("Cliente eliminato con successo.");
    } catch (error) {
      console.error("Errore nell'eliminazione del cliente:", error);
      res.status(500).send("Eliminazione del cliente fallita");
    }
  }
}

module.exports = CustomerController;
