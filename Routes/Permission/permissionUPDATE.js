// permissionUPDATE.js
const express = require("express");
const router = express.Router();
const PermissionController = require("../../Controllers/PermissionController");

const permissionUPDATE = (db) => {
  // Definisci le route UPDATE qui

  router.put("/UpdateRoleData", (req, res) => {
    PermissionController.updateCustomerData(req, res, db);
  });

  return router;
};

module.exports = permissionUPDATE;
