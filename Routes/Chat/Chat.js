// stafferRoutes.js
const express = require("express");
const router = express.Router();
const chatGET = require("./chatGET");
const chatPOST = require("./chatPOST");
const chatUPDATE = require("./chatUPDATE");
const chatDELETE = require("./chatDELETE");

const Chat = (db) => {
  router.use("/GET", chatGET(db)); // Passa il database a stafferGET
  router.use("/POST", chatPOST(db)); // Passa il database a stafferPOST
  router.use("/UPDATE", chatUPDATE(db)); // Passa il database a stafferUPDATE
  router.use("/DELETE", chatDELETE(db)); // Passa il database a stafferDELETE
  return router;
};

module.exports = Chat;
