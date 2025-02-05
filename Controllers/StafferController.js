//StafferController.js
const EmailService = require("../middlewares/EmailService/EmailService");
const Staffer = require("../Models/StafferModel");
const path = require("path");
const fs = require("fs");

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

  static async getNewStaffers(res, db) {
    try {
      const staffers = await Staffer.getNewStaffers(db);
      if (staffers.length > 0) {
        res.status(200).json(staffers);
      } else {
        res.status(404).send("Nessun dipendente trovato");
      }
    } catch (error) {
      console.error("Errore nel recupero dei nuovi dipendenti:", error);
      res.status(500).send("Recupero dei nuovi dipendenti fallita");
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

      // Sending welcome email if staffer is added successfully
      EmailService.sendStafferWelcomeMail(
        StafferData.EmployeeEmail,
        StafferData.EmployeeName,
        StafferData.EmployeeSurname,
        StafferData.EmployeePassword
      );

      res.status(200).send("Dipendente aggiunto con successo.");
    } catch (error) {
      console.error("Errore nell'aggiunta del dipendente:", error);

      // Handle conflict error (409)
      if (error.message === "Un dipendente con la stessa email esiste già.") {
        res.status(409).send("Un dipendente con la stessa email esiste già.");
      } else {
        res.status(500).send("Aggiunta del dipendente fallita");
      }
    }
  }

  static async updateStaffer(req, res, db) {
    try {
      const newEmployeeData = req.body.newEmployeeData;
      const selectedRole = req.body.selectedRole;

      await Staffer.updateStaffer(db, newEmployeeData, selectedRole);
      res.status(200).send("Dipendente modificato con successo.");
    } catch (error) {
      console.error("Errore nella modifica del dipendente:", error);

      // Check if the error message indicates a conflict (409 status)
      if (
        error.message ===
        "Conflict: Another staffer with the same email exists."
      ) {
        res
          .status(409)
          .send(
            "Impossibile modificare il dipendente: un altro dipendente ha già la stessa email."
          );
      } else {
        res.status(500).send("Modifica del dipendente fallita.");
      }
    }
  }

  static async settingsUpdateStaffer(req, res, db) {
    try {
      const newEmployeeData = JSON.parse(req.body.newEmployeeData);
      const newProfilePic = req.file;
      const oldPhoto = req.body.oldPhoto;

      await Staffer.settingsUpdateStaffer(db, newEmployeeData, newProfilePic);

      req.session.account.StafferName = newEmployeeData.StafferName;
      req.session.account.StafferSurname = newEmployeeData.StafferSurname;
      req.session.account.StafferPhone = newEmployeeData.StafferPhone;
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

        req.session.account.StafferImageUrl = newProfilePic.filename;
      }

      res.status(200).send("Dipendente modificato con successo.");
    } catch (error) {
      console.error("Errore nella modifica del dipendente:", error);
      res.status(500).send("Modifica del dipendente fallita");
    }
  }

  static async updateStafferPassword(req, res, db) {
    try {
      const changePasswordData = req.body.ChangePasswordData;

      const staffer = await Staffer.updateStafferPassword(
        db,
        changePasswordData,
        req.session.account.StafferId
      );

      if (!staffer) {
        return res.status(401).send("Password errata.");
      }

      EmailService.sendPasswordChangedMail(
        staffer.StafferEmail,
        staffer.StafferName,
        staffer.StafferSurname
      );

      res.status(200).send("Password modificata con successo.");
    } catch (error) {
      console.error("Errore nella modifica della password:", error);
      res.status(500).send("Modifica della password fallita");
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

  static async getStafferProjectsForModal(req, res, db) {
    try {
      const EmployeeId = req.query.EmployeeId;
      const projects = await Staffer.getStafferProjectsForModal(db, EmployeeId);
      res.status(200).json(projects);
    } catch (error) {
      console.error("Errore nel recupero dei progetti del dipendente:", error);
      res.status(500).send("Recupero dei progetti del dipendente fallita");
    }
  }

  static async getAttendanceByStafferId(req, res, db) {
    try {
      const month = req.query.month;
      const year = req.query.year;
      const StafferId = req.query.stafferId;
      const attendance = await Staffer.getAttendanceByStafferId(
        db,
        month,
        year,
        StafferId
      );
      res.status(200).json(attendance);
    } catch (error) {
      console.error(
        "Errore nel recupero dell'assiduità dei dipendenti:",
        error
      );
      res.status(500).send("Recupero dell'assiduità dei dipendenti fallita");
    }
  }

  static async updateStafferAttendance(req, res, db) {
    try {
      const Status = req.body.Status;
      const StafferId = req.body.StafferId;
      const Date = req.body.Date;

      await Staffer.updateStafferAttendance(db, Status, StafferId, Date);
      res.status(200).send("Assiduità del dipendente modificata con successo.");
    } catch (error) {
      console.error(
        "Errore nella modifica dell'assiduità del dipendente:",
        error
      );
      res.status(500).send("Modifica dell'assiduità del dipendente fallita");
    }
  }
}

module.exports = StafferController;
