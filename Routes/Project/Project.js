// projectRoutes.js
const express = require("express");
const router = express.Router();
const projectGET = require("./projectGET");
const projectPOST = require("./projectPOST");
const projectDELETE = require("./projectDELETE");
const projectUPDATE = require("./projectUPDATE");

const Project = (db) => {
  router.use("/GET", projectGET(db)); // Passa il database a permissionGET
  router.use("/POST", projectPOST(db)); // Passa il database a permissionPOST
  router.use("/UPDATE", projectUPDATE(db)); // Passa il database a permissionUPDATE
  router.use("/DELETE", projectDELETE(db)); // Passa il database a permissionDELETE
  return router;
};

module.exports = Project;
