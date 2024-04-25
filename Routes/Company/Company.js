// stafferRoutes.js
const express = require("express");
const router = express.Router();
const companyGET = require("./companyGET");
const companyPOST = require("./companyPOST");
const companyUPDATE = require("./companyUPDATE");
const companyDELETE = require("./companyDELETE");

const Staffer = (db) => {
  router.use("/GET", companyGET(db)); // Passa il database a stafferGET
  router.use("/POST", companyPOST(db)); // Passa il database a stafferPOST
  router.use("/UPDATE", companyUPDATE(db)); // Passa il database a stafferUPDATE
  router.use("/DELETE", companyDELETE(db)); // Passa il database a stafferDELETE
  return router;
};

module.exports = Staffer;
