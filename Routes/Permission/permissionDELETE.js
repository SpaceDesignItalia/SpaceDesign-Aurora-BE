// permissionDELETE.js
const express = require("express");
const router = express.Router();
const PermissionController = require("../../Controllers/PermissionController");

const permissionDELETE = (db) => {
  router.delete("/DeleteRole", (req, res) => {
    PermissionController.deleteRole(req, res, db);
  });

  return router;
};

module.exports = permissionDELETE;
