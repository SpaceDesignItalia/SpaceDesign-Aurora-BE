// controller/PermissionController.js
const Permission = require("../Models/PermissionModel");

class PermissionController {
  static async getAllPermissionsGroups() {
    try {
      const permissions = await Permission.getAllPermissionsGroups();
      io.emit("permissionsData", permissions); // Invia i dati ai client tramite WebSocket
    } catch (error) {
      console.error("Error fetching permissions:", error);
      io.emit("permissionsError", { message: "Error fetching permissions" }); // Invia un messaggio di errore ai client tramite WebSocket
    }
  }
}

module.exports = PermissionController;
