// stafferRoutes.js
const express = require("express");
const router = express.Router();
const customerGET = require("./customerGET");
const customerPOST = require("./customerPOST");
const customerUPDATE = require("./customerUPDATE");
const customerDELETE = require("./customerDELETE");

const Customer = (db) => {
  router.use("/GET", customerGET(db)); // Passa il database a stafferGET
  router.use("/POST", customerPOST(db)); // Passa il database a stafferPOST
  router.use("/UPDATE", customerUPDATE(db)); // Passa il database a stafferUPDATE
  router.use("/DELETE", customerDELETE(db)); // Passa il database a stafferDELETE
  return router;
};

module.exports = Customer;
