// stafferRoutes.js
const express = require("express");
const router = express.Router();
const permissionGET = require("./permissionGET");

const Staffer = (db) => {
  router.use("/GET", permissionGET(db)); // Passa il database a permissionGET
  return router;
};

module.exports = Staffer;
