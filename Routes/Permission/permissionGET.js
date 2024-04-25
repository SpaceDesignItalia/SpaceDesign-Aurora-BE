// stafferGET.js
const express = require("express");
const router = express.Router();
const PermissionController = require("../../Controllers/PermissionController");
const socketIO = require("socket.io");

const permissionGET = (db, server) => {
  // Definisci le route GET qui
  router.get("/GetPermissionGroups", (req, res) => {
    PermissionController.getAllPermissionsGroups(req, res, db);
  });

  // Inizializza Socket.IO e gestisci la connessione WebSocket
  const io = socketIO(server);
  io.on("connection", (socket) => {
    console.log("Nuova connessione WebSocket");

    // Quando il client richiede i dati, invia i dati tramite WebSocket
    socket.on("getPermissions", () => {
      PermissionController.getAllPermissionsGroups(null, null, db)
        .then((data) => {
          socket.emit("permissions", data);
        })
        .catch((error) => {
          console.error("Errore durante il recupero dei dati:", error);
          socket.emit(
            "error",
            "Errore durante il recupero dei dati dal database"
          );
        });
    });
  });

  return router; // Ritorna il router per consentire l'utilizzo da parte dell'app principale
};

module.exports = permissionGET;
