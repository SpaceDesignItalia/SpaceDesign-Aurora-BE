// Fileicon.js
const express = require("express");
const router = express.Router();
const fileiconGET = require("./fileiconGET");

const Fileicon = () => {
  router.use("/GET", fileiconGET()); // Passa il database a notificationGET
  return router;
};

module.exports = Fileicon;
