// controller/PermissionController.js
const Chat = require("../Models/ChatModel");

class ChatController {
  static async getConversationByStafferId(req, res, db) {
    try {
      const StafferId = req.query.StafferId;
      console.log("StafferId", StafferId);
      const conversations = await Chat.getConversationByStafferId(
        db,
        StafferId
      );
      res.status(200).json(conversations);
    } catch (error) {
      console.error("Errore nel recupero della conversazione", error);
      res.status(500).send("Recupero della conversazione fallita");
    }
  }

  static async getMessagesByConversationId(req, res, db) {
    try {
      const ConversationId = req.query.ConversationId;
      const messages = await Chat.getMessagesByConversationId(
        db,
        ConversationId
      );
      res.status(200).json(messages);
    } catch (error) {
      console.error("Errore nel recupero dei messaggi", error);
      res.status(500).send("Recupero dei messaggi fallito");
    }
  }

  static async sendMessage(req, res, db) {
    try {
      const { ConversationId, StafferSenderId, Text } = req.body;
      await Chat.sendMessage(db, ConversationId, StafferSenderId, Text);
      res.status(200).send("Messaggio inviato con successo");
    } catch (error) {
      console.error("Errore nell'invio del messaggio", error);
      res.status(500).send("Invio del messaggio fallito");
    }
  }

  static async getConversationByStaffersId(req, res, db) {
    try {
      const Staffer1Id = req.query.Staffer1Id;
      const Staffer2Id = req.query.Staffer2Id;

      console.log("Staffer1Id", Staffer1Id);
      console.log("Staffer2Id", Staffer2Id);

      const messages = await Chat.getConversationByStaffersId(
        db,
        Staffer1Id,
        Staffer2Id
      );
      res.status(200).json(messages);
    } catch (error) {
      console.error("Errore nel recupero dei messaggi", error);
      res.status(500).send("Recupero dei messaggi fallito");
    }
  }

  static async createConversation(req, res, db) {
    try {
      const { Staffer1Id, Staffer2Id } = req.body;
      const conversationId = await Chat.createConversation(
        db,
        Staffer1Id,
        Staffer2Id
      );
      console.log("conversationId", conversationId);
      res.status(200).send(conversationId);
    } catch (error) {
      console.error("Errore nella creazione della conversazione", error);
      res.status(500).send("Creazione della conversazione fallita");
    }
  }

  static async deleteConversationByConversationId(req, res, db) {
    try {
      const ConversationId = req.query.ConversationId;
      await Chat.deleteConversationByConversationId(db, ConversationId);
      res.status(200).send("Conversazione eliminata con successo");
    } catch (error) {
      console.error("Errore nell'eliminazione della conversazione", error);
      res.status(500).send("Eliminazione della conversazione fallita");
    }
  }
}

module.exports = ChatController;