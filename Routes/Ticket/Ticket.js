// stafferRoutes.js
const express = require("express");
const router = express.Router();

const ticketGET = require("./ticketGET");
const ticketPOST = require("./ticketPOST");
const ticketUPDATE = require("./ticketUPDATE");

const Staffer = (db) => {
  router.use("/GET", ticketGET(db)); // Passa il database a stafferGET
  router.use("/POST", ticketPOST(db)); // Passa il database a stafferPOST
  router.use("/PUT", ticketUPDATE(db)); // Passa il database a stafferUPDATE
  return router;
};

module.exports = Staffer;
