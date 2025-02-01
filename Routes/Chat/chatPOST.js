// stafferGET.js
const express = require("express");
const router = express.Router();
const ChatController = require("../../Controllers/ChatController");
const authenticateMiddleware = require("../../middlewares/Authentication/Authmiddleware");

const chatPOST = (db) => {
  // Definisci le route GET qui

  router.post("/sendMessage", authenticateMiddleware, (req, res) => {
    ChatController.sendMessage(req, res, db);
  });

  router.post("/SendCustomerMessage", authenticateMiddleware, (req, res) => {
    ChatController.SendCustomerMessage(req, res, db);
  });

  router.post("/createConversation", authenticateMiddleware, (req, res) => {
    ChatController.createConversation(req, res, db);
  });

  return router; // Ritorna il router per consentire l'utilizzo da parte dell'app principale
};

module.exports = chatPOST;
