// permissionPOST.js
const express = require("express");
const router = express.Router();
const PermissionController = require("../../Controllers/PermissionController");
const authenticateMiddleware = require("../../middlewares/Authentication/Authmiddleware");

const permissionPOST = (db) => {
  // Definisci le route GET qui

  router.post("/AddRole", authenticateMiddleware, (req, res) => {
    PermissionController.addRole(req, res, db);
  });

  router.post("/AddPermission", authenticateMiddleware, (req, res) => {
    PermissionController.addPermission(req, res, db);
  });

  return router;
};

module.exports = permissionPOST;
