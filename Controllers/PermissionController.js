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

  static async addRole(req, res, db) {
    try {
      const RoleData = req.body.RoleData;
      const RolePermissionData = req.body.RolePermissionData;

      await Permission.addRole(db, RoleData, RolePermissionData);
      res.status(200).send("Cliente aggiunto con successo.");
    } catch (error) {
      console.error("Error nell'aggiungere il cliente:", error);
      res.status(500).send("Aggiunta del cliente fallita.");
    }
  }
}

module.exports = PermissionController;
