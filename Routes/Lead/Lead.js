// leadRoutes.js
const express = require("express");
const router = express.Router();
const leadGET = require("./leadGET");
const leadPOST = require("./leadPOST");
const leadDELETE = require("./leadDELETE");
const leadUPDATE = require("./leadUPDATE");

const Lead = (db) => {
  router.use("/GET", leadGET(db)); // Passa il database a leadGET
  router.use("/POST", leadPOST(db)); // Passa il database a leadPOST
  router.use("/UPDATE", leadUPDATE(db)); // Passa il database a leadUPDATE
  router.use("/DELETE", leadDELETE(db)); // Passa il database a leadDELETE
  return router;
};

module.exports = Lead;
