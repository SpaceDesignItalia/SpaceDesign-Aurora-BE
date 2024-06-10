// permissionPOST.js
const express = require("express");
const router = express.Router();
const PermissionController = require("../../Controllers/PermissionController");

const permissionPOST = (db) => {
  // Definisci le route GET qui

  router.post("/AddRole", (req, res) => {
    PermissionController.addRole(req, res, db);
  });

  return router;
};

module.exports = permissionPOST;
