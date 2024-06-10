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

  static async addRole(req, res, db) {
    try {
      const RoleData = req.body.RoleData;
      const RolePermissionData = req.body.RolePermissionData;

      await Permission.addRole(db, RoleData, RolePermissionData);
      res.status(200).send("Ruolo aggiunto con successo.");
    } catch (error) {
      console.error("Error nell'aggiungere il ruolo:", error);
      res.status(500).send("Aggiunta del ruolo fallita.");
    }
  }

  static async deleteRole(req, res, db) {
    try {
      const RoleId = req.query.RoleId;
      await Permission.deleteRole(db, RoleId);
      res.status(200).send("Ruolo eliminato con successo.");
    } catch (error) {
      console.error("Error nell'eliminare il ruolo:", error);
      res.status(500).send("Aggiunta del ruolo fallita.");
    }
  }

  static async updateRole(req, res, db) {
    try {
      const RoleData = req.body.RoleData;
      const RolePermissionData = req.body.RolePermissionData;

      await Permission.updateRole(db, RoleData, RolePermissionData);
      res.status(200).send("Ruolo aggiornato con successo.");
    } catch (error) {
      console.error("Error nell'aggiornare il ruolo:", error);
      res.status(500).send("Aggiunta del ruolo fallita.");
    }
  }
}

module.exports = PermissionController;
