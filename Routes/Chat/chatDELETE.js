// stafferGET.js
const express = require("express");
const router = express.Router();
const ChatController = require("../../Controllers/ChatController");
const authenticateMiddleware = require("../../middlewares/EmailService/Authentication/Authmiddleware");

const chatDELETE = (db) => {
  // Definisci le route GET qui
  router.delete(
    "/deleteConversationByConversationId",
    authenticateMiddleware,
    (req, res) => {
      ChatController.deleteConversationByConversationId(req, res, db);
    }
  );
  return router; // Ritorna il router per consentire l'utilizzo da parte dell'app principale
};

module.exports = chatDELETE;
