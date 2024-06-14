// controller/PermissionController.js
const Chat = require("../Models/ChatModel");

class ChatController {
    static async getConversationByStafferId(req, res, db) {
      try {
        const StafferId = req.query.StafferId;
        console.log("StafferId", StafferId);
        const conversations = await Chat.getConversationByStafferId(db, StafferId);
        res.status(200).json(conversations);
      } catch (error) {
        console.error("Errore nel recupero della conversazione", error);
        res.status(500).send("Recupero della conversazione fallita");
      }
    }

    static async getMessagesByConversationId(req, res, db) {
      try {
        const ConversationId = req.query.ConversationId;
        const messages = await Chat.getMessagesByConversationId(db, ConversationId);
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
}

module.exports = ChatController;
