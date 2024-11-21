// stafferRoutes.js
const express = require("express");
const router = express.Router();
const stafferGET = require("./stafferGET");
const stafferPOST = require("./stafferPOST");
const stafferUPDATE = require("./stafferUPDATE");
const stafferDELETE = require("./stafferDELETE");

const Staffer = (db) => {
  router.use("/GET", stafferGET(db)); // Passa il database a stafferGET
  router.use("/POST", stafferPOST(db)); // Passa il database a stafferPOST
  router.use("/UPDATE", stafferUPDATE(db)); // Passa il database a stafferUPDATE
  router.use("/DELETE", stafferDELETE(db)); // Passa il database a stafferDELETE
  return router;
};

module.exports = Staffer;
