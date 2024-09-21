// stafferGET.js
const express = require("express");
const router = express.Router();
const ChatController = require("../../Controllers/ChatController");
const authenticateMiddleware = require("../../middlewares/EmailService/Authentication/Authmiddleware");

const chatGET = (db) => {
  // Definisci le route GET qui

  router.get(
    "/getConversationByStafferId",
    authenticateMiddleware,
    (req, res) => {
      ChatController.getConversationByStafferId(req, res, db);
    }
  );

  router.get(
    "/getMessagesByConversationId",
    authenticateMiddleware,
    (req, res) => {
      ChatController.getMessagesByConversationId(req, res, db);
    }
  );

  router.get(
    "/getConversationByStaffersId",
    authenticateMiddleware,
    (req, res) => {
      ChatController.getConversationByStaffersId(req, res, db);
    }
  );

  router.get(
    "/FindStaffersWithoutMessagesFromLoggedStaffer",
    authenticateMiddleware,
    (req, res) => {
      ChatController.findStaffersWithoutMessagesFromLoggedStaffer(req, res, db);
    }
  );

  return router; // Ritorna il router per consentire l'utilizzo da parte dell'app principale
};

module.exports = chatGET;
