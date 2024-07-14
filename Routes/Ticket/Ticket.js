// stafferRoutes.js
const express = require("express");
const router = express.Router();

const ticketGET = require("./ticketGET");
const ticketPOST = require("./ticketPOST");

const Staffer = (db) => {
  router.use("/GET", ticketGET(db)); // Passa il database a stafferGET
  router.use("/POST", ticketPOST(db)); // Passa il database a stafferPOST
  return router;
};

module.exports = Staffer;
