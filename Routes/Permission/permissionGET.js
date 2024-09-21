// permissionGET.js
const express = require("express");
const router = express.Router();
const PermissionController = require("../../Controllers/PermissionController");
const authenticateMiddleware = require("../../middlewares/EmailService/Authentication/Authmiddleware");

const permissionGET = (db) => {
  // Definisci le route GET qui
  router.get("/GetPermissionGroups", authenticateMiddleware, (req, res) => {
    PermissionController.getAllPermissionsGroups(req, res, db);
  });

  router.get("/GetAllPermissions", authenticateMiddleware, (req, res) => {
    PermissionController.getAllPermissions(req, res, db);
  });

  router.get("/GetAllRoles", authenticateMiddleware, (req, res) => {
    PermissionController.getAllRoles(req, res, db);
  });

  router.get("/GetRoleById", authenticateMiddleware, (req, res) => {
    PermissionController.getRoleById(req, res, db);
  });

  router.get("/GetPermissionById", authenticateMiddleware, (req, res) => {
    PermissionController.getPermissionById(req, res, db);
  });

  router.get("/SearchRoleByName", authenticateMiddleware, (req, res) => {
    PermissionController.searchRoleByName(req, res, db);
  });

  router.get("/SearchPermissionByName", authenticateMiddleware, (req, res) => {
    PermissionController.searchPermissionByName(req, res, db);
  });

  router.get(
    "/GetPermissionsByUserRole",
    authenticateMiddleware,
    (req, res) => {
      PermissionController.getPermissionsByUserRole(req, res, db);
    }
  );

  return router; // Ritorna il router per consentire l'utilizzo da parte dell'app principale
};

module.exports = permissionGET;
