// permissionUPDATE.js
const express = require("express");
const router = express.Router();
const PermissionController = require("../../Controllers/PermissionController");

const permissionUPDATE = (db) => {
  // Definisci le route UPDATE qui

  router.put("/UpdateRole", (req, res) => {
    PermissionController.updateRole(req, res, db);
  });

  return router;
};

module.exports = permissionUPDATE;
