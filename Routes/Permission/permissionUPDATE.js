// permissionUPDATE.js
const express = require("express");
const router = express.Router();
const PermissionController = require("../../Controllers/PermissionController");
const authenticateMiddleware = require("../../middlewares/Authentication/Authmiddleware");

const permissionUPDATE = (db) => {
  // Definisci le route UPDATE qui

  router.put("/UpdateRole", authenticateMiddleware, (req, res) => {
    PermissionController.updateRole(req, res, db);
  });

  router.put("/UpdatePermission", authenticateMiddleware, (req, res) => {
    PermissionController.updatePermission(req, res, db);
  });

  return router;
};

module.exports = permissionUPDATE;
