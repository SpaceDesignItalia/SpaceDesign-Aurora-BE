// stafferRoutes.js
const express = require("express");
const router = express.Router();
const permissionGET = require("./permissionGET");
const permissionPOST = require("./permissionPOST");
const permissionDELETE = require("./permissionDELETE");

const Permission = (db) => {
  router.use("/GET", permissionGET(db)); // Passa il database a permissionGET
  router.use("/POST", permissionPOST(db)); // Passa il database a permissionPOST
  router.use("/DELETE", permissionDELETE(db)); // Passa il database a permissionDELETE
  return router;
};

module.exports = Permission;
