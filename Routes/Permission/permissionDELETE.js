// permissionDELETE.js
const express = require("express");
const router = express.Router();
const PermissionController = require("../../Controllers/PermissionController");
const authenticateMiddleware = require("../../middlewares/EmailService/Authentication/Authmiddleware");

const permissionDELETE = (db) => {
  router.delete("/DeleteRole", authenticateMiddleware, (req, res) => {
    PermissionController.deleteRole(req, res, db);
  });

  router.delete("/DeletePermission", authenticateMiddleware, (req, res) => {
    PermissionController.deletePermission(req, res, db);
  });

  return router;
};

module.exports = permissionDELETE;
