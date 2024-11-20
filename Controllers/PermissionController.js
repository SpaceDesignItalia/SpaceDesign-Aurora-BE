// controller/PermissionController.js
const Permission = require("../Models/PermissionModel");

class PermissionController {
  static async getAllPermissionsGroups(req, res, db) {
    try {
      const groups = await Permission.getAllPermissionsGroups(db);
      res.status(200).json(groups);
    } catch (error) {
      console.error("Errore nel recupero dei gruppi:", error);
      res.status(500).send("Recupero dei gruppi fallita");
    }
  }

  static async getAllPermissions(req, res, db) {
    try {
      const permissions = await Permission.getAllPermissions(db);
      res.status(200).json(permissions);
    } catch (error) {
      console.error("Errore nel recupero dei permessi:", error);
      res.status(500).send("Recupero dei permessi fallita");
    }
  }

  static async getAllRoles(req, res, db) {
    try {
      const roles = await Permission.getAllRoles(db);
      res.status(200).json(roles);
    } catch (error) {
      console.error("Errore nel recupero dei ruoli:", error);
      res.status(500).send("Recupero dei permessi fallita");
    }
  }

  static async getRoleById(req, res, db) {
    try {
      const RoleId = req.query.RoleId;
      const roles = await Permission.getRoleById(db, RoleId);
      res.status(200).json(roles);
    } catch (error) {
      console.error("Errore nel recupero dei ruoli:", error);
      res.status(500).send("Recupero dei ruoli fallita");
    }
  }

  static async getPermissionById(req, res, db) {
    try {
      const PermissionId = req.query.PermissionId;
      const permissions = await Permission.getPermissionById(db, PermissionId);
      res.status(200).json(permissions);
    } catch (error) {
      console.error("Errore nel recupero dei permessi:", error);
      res.status(500).send("Recupero dei permessi fallita");
    }
  }

  static async getPermissionsByUserRole(req, res, db) {
    try {
      const StafferId = req.query.StafferId;
      const roles = await Permission.getPermissionsByUserRole(db, StafferId);
      res.status(200).json(roles);
    } catch (error) {
      console.error("Errore nel recupero dei permessi:", error);
      res.status(500).send("Recupero dei permessi fallita");
    }
  }

  static async searchRoleByName(req, res, db) {
    try {
      const RoleName = req.query.RoleName;
      const roles = await Permission.searchRoleByName(db, RoleName);
      res.status(200).json(roles);
    } catch (error) {
      console.error("Errore nel recupero dei ruoli:", error);
      res.status(500).send("Recupero dei ruoli fallita");
    }
  }

  static async searchPermissionByName(req, res, db) {
    try {
      const PermissionName = req.query.PermissionName;
      const permissions = await Permission.searchPermissionByName(
        db,
        PermissionName
      );
      res.status(200).json(permissions);
    } catch (error) {
      console.error("Errore nel recupero dei permessi:", error);
      res.status(500).send("Recupero dei permessi fallita");
    }
  }

  static async addRole(req, res, db) {
    try {
      const RoleData = req.body.RoleData;
      const RolePermissionData = req.body.RolePermissionData;

      await Permission.addRole(db, RoleData, RolePermissionData);
      res.status(200).send("Ruolo aggiunto con successo.");
    } catch (error) {
      if (error.message === "Un ruolo con questo nome esiste già.") {
        res.status(409).send("Un ruolo con questo nome esiste già.");
      } else {
        console.error("Error nell'aggiungere il ruolo:", error);
        res.status(500).send("Aggiunta del ruolo fallita.");
      }
    }
  }

  static async addPermission(req, res, db) {
    try {
      const PermissionData = req.body.PermissionData;
      await Permission.addPermission(db, PermissionData);
      res.status(200).send("Permesso aggiunto con successo.");
    } catch (error) {
      console.error("Error nell'aggiungere il permesso:", error);
      res.status(500).send("Aggiunta del permesso fallita.");
    }
  }

  static async updateRole(req, res, db) {
    try {
      const RoleId = req.body.RoleId;
      const RoleData = req.body.RoleData;
      const RolePermissionData = req.body.RolePermissionData;

      await Permission.updateRole(db, RoleId, RoleData, RolePermissionData);
      res.status(200).send("Ruolo aggiornato con successo.");
    } catch (error) {
      console.error("Errore nell'aggiornare il ruolo:", error);

      // Check if the error message indicates a conflict (409 status)
      if (
        error.message === "Conflict: Another role with the same name exists."
      ) {
        res
          .status(409)
          .send(
            "Impossibile aggiornare il ruolo: esiste già un ruolo con lo stesso nome."
          );
      } else {
        res.status(500).send("Aggiornamento del ruolo fallito.");
      }
    }
  }

  static async updatePermission(req, res, db) {
    try {
      const PermissionData = req.body.PermissionData;
      await Permission.updatePermission(db, PermissionData);
      res.status(200).send("Permesso aggiornato con successo.");
    } catch (error) {
      console.error("Error nell'aggiornare il permesso:", error);
      res.status(500).send("Aggiornamento del permesso fallito.");
    }
  }

  static async deleteRole(req, res, db) {
    try {
      const RoleId = req.query.RoleId;
      await Permission.deleteRole(db, RoleId);
      res.status(200).send("Ruolo eliminato con successo.");
    } catch (error) {
      console.error("Error nell'eliminare il ruolo:", error);
      res.status(500).send("Eliminazione del ruolo fallita.");
    }
  }

  static async deletePermission(req, res, db) {
    try {
      const PermissionId = req.query.PermissionId;
      await Permission.deletePermission(db, PermissionId);
      res.status(200).send("Permesso eliminato con successo.");
    } catch (error) {
      console.error("Error nell'eliminare il permesso:", error);
      res.status(500).send("Eliminazione del permesso fallita.");
    }
  }
}

module.exports = PermissionController;
