// permissionGET.js
const express = require("express");
const router = express.Router();
const PermissionController = require("../../Controllers/PermissionController");

const permissionGET = (db) => {
  // Definisci le route GET qui
  router.get("/GetPermissionGroups", (req, res) => {
    PermissionController.getAllPermissionsGroups(req, res, db);
  });

  router.get("/GetAllPermissions", (req, res) => {
    PermissionController.getAllPermissions(req, res, db);
  });

  router.get("/GetAllRoles", (req, res) => {
    PermissionController.getAllRoles(req, res, db);
  });

  router.get("/GetRoleById", (req, res) => {
    PermissionController.getRoleById(req, res, db);
  });

  router.get("/SearchRoleByName", (req, res) => {
    PermissionController.searchRoleByName(req, res, db);
  });

  router.get("/GetPermissionsByUserRole", (req, res) => {
    PermissionController.getPermissionsByUserRole(req, res, db);
  });

  return router; // Ritorna il router per consentire l'utilizzo da parte dell'app principale
};

module.exports = permissionGET;
