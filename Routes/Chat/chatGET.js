// stafferGET.js
const express = require("express");
const router = express.Router();
const ChatController = require("../../Controllers/ChatController");

const chatGET = (db) => {
  // Definisci le route GET qui

  router.get("/getConversationByStafferId", (req, res) => {
    ChatController.getConversationByStafferId(req, res, db);
  });

  router.get("/getMessagesByConversationId", (req, res) => {
    ChatController.getMessagesByConversationId(req, res, db);
  });

  router.get("/getConversationByStaffersId", (req, res) => {
    ChatController.getConversationByStaffersId(req, res, db);
  });

  router.get("/FindStaffersWithoutMessagesFromLoggedStaffer", (req, res) => {
    ChatController.findStaffersWithoutMessagesFromLoggedStaffer(req, res, db);
  });

  return router; // Ritorna il router per consentire l'utilizzo da parte dell'app principale
};

module.exports = chatGET;
