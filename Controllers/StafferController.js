//StafferController.js
const EmailService = require("../middlewares/EmailService/EmailService");
const Staffer = require("../Models/StafferModel");

class StafferController {
  static async getAllStaffers(res, db) {
    try {
      const staffers = await Staffer.getAllStaffers(db);
      if (staffers.length > 0) {
        res.status(200).json(staffers);
      } else {
        res.status(404).send("Nessun dipendente trovato");
      }
    } catch (error) {
      console.error("Errore nel recupero dei dipendenti:", error);
      res.status(500).send("Recupero dei dipendenti fallita");
    }
  }

  static async getStafferById(req, res, db) {
    try {
      const EmployeeId = req.query.EmployeeId;
      const staffer = await Staffer.getStafferById(db, EmployeeId);
      res.status(200).json(staffer);
    } catch (error) {
      console.error("Errore nel recupero del dipendente:", error);
      res.status(500).send("Recupero del dipendente fallita");
    }
  }

  static async getStafferRoleById(req, res, db) {
    try {
      const EmployeeId = req.query.EmployeeId;
      const roleId = await Staffer.getStafferRoleById(db, EmployeeId);
      res.status(200).json(roleId);
    } catch (error) {
      console.error("Errore nel recupero del ruolo:", error);
      res.status(500).send("Recupero del ruolo fallita");
    }
  }

  static async searchStafferByEmail(req, res, db) {
    try {
      const EmployeeEmail = req.query.EmployeeEmail;
      const staffer = await Staffer.searchStafferByEmail(db, EmployeeEmail);
      res.status(200).json(staffer);
    } catch (error) {
      console.error("Errore nella ricerca del dipendente:", error);
      res.status(500).send("Recupero del dipendente fallita");
    }
  }

  static async addNewStaffer(req, res, db) {
    try {
      const StafferData = req.body.EmployeeData;
      const SelectedRole = req.body.SelectedRole;

      await Staffer.addNewStaffer(db, StafferData, SelectedRole);
      EmailService.sendStafferWelcomeMail(
        StafferData.EmployeeEmail,
        StafferData.EmployeeName,
        StafferData.EmployeeSurname,
        StafferData.EmployeePassword
      );
      res.status(200).send("Dipendente aggiunto con successo.");
    } catch (error) {
      console.error("Errore nell'aggiunta del dipendente:", error);
      res.status(500).send("Aggiunta del dipendente fallita");
    }
  }

  static async updateStaffer(req, res, db) {
    try {
      const newEmployeeData = req.body.newEmployeeData;
      const selectedRole = req.body.selectedRole;

      console.log(newEmployeeData, selectedRole);
      await Staffer.updateStaffer(db, newEmployeeData, selectedRole);
      res.status(200).send("Dipendente modificato con successo.");
    } catch (error) {
      console.error("Errore nella modifica del dipendente:", error);
      res.status(500).send("Modifica del dipendente fallita");
    }
  }

  static async deleteStaffer(req, res, db) {
    try {
      const EmployeeData = req.query.EmployeeData;
      await Staffer.deleteStaffer(db, EmployeeData);
      EmailService.sendStafferRemoval(
        EmployeeData.EmployeeEmail,
        EmployeeData.EmployeeFullName
      );
      res.status(200).send("Dipendente cancellato con successo.");
    } catch (error) {
      console.error("Errore nella cancellazione del dipendente:", error);
      res.status(500).send("Cancellazione del dipendente fallita");
    }
  }
}

module.exports = StafferController;
