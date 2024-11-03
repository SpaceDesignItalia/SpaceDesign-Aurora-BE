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
      await Customer.addCustomer(db, customerData);

      // Send a welcome email upon successful customer creation
      EmailService.sendCustomerWelcomeMail(
        customerData.CustomerEmail,
        customerData.CustomerName,
        customerData.CustomerSurname,
        customerData.CustomerPassword
      );
      res.status(200).send("Cliente aggiunto con successo.");
    } catch (error) {
      console.error("Errore nell'aggiungere il cliente:", error);

      // Check for duplicate email error based on error message or custom error code
      if (error.message === "Un cliente con questa email esiste già.") {
        res.status(409).send("Esiste già un cliente con questa email.");
      } else {
        res.status(500).send("Aggiunta del cliente fallita.");
      }
    }
  }

  static async updateCustomerData(req, res, db) {
    try {
      const CustomerData = req.body.CustomerData;
      const OldCompanyId = req.body.OldCompanyId;

      // Attempt to update customer data
      await Customer.updateCustomerData(db, CustomerData, OldCompanyId);

      res.status(200).send("Cliente modificato con successo.");
    } catch (error) {
      console.error("Errore nell'aggiornamento del cliente:", error);

      // Check if the error is a 409 conflict error
      if (error.statusCode === 409) {
        // Send 409 Conflict status if email already exists
        res.status(409).send("Email già in uso da un altro cliente.");
      } else {
        // Handle any other errors as a 500 Internal Server Error
        res.status(500).send("Aggiornamento del cliente fallito.");
      }
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

      EmailService.sendPasswordChangedMail(
        customer.CustomerEmail,
        customer.CustomerName,
        customer.CustomerSurname
      );

      res.status(200).send("Password modificata con successo.");
    } catch (error) {
      console.error("Errore nella modifica della password:", error);
      res.status(500).send("Modifica della password fallita");
    }
  }

  static async deleteCustomer(req, res, db) {
    try {
      const CustomerId = req.query.CustomerId;
      console.log(CustomerId);
      await Customer.deleteCustomer(db, CustomerId);
      res.status(200).send("Cliente eliminato con successo.");
    } catch (error) {
      console.error("Errore nell'eliminazione del cliente:", error);
      res.status(500).send("Eliminazione del cliente fallita");
    }
  }
}

module.exports = CustomerController;
