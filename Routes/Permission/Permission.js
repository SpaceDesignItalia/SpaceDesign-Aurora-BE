// stafferRoutes.js
const express = require("express");
const router = express.Router();
const permissionGET = require("./permissionGET");
const permissionPOST = require("./permissionPOST");

const Staffer = (db) => {
  router.use("/GET", permissionGET(db)); // Passa il database a permissionGET
  router.use("/POST", permissionPOST(db)); // Passa il database a permissionPOST
  return router;
};

module.exports = Staffer;
