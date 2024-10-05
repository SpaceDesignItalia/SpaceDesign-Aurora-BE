const NotificationModel = require("../Models/NotificationModel");

class NotificationController {
  static async getAllNotifications(db, req, res) {
    const userId = req.session.account.StafferId;
    try {
      const notifications = await NotificationModel.getAllNotifications(
        userId,
        db
      );
      res.status(200).json(notifications);
    } catch (err) {
      res.status(500).send("Errore nel recupero delle notifiche");
      console.error(err);
    }
  }

  static async deleteNotification(db, req, res) {
    const notificationId = req.query.NotificationId;
    const userId = req.session.account.StafferId;
    try {
      await NotificationModel.deleteNotification(notificationId, userId, db);
      res.status(200).send("Notifica eliminata con successo");
    } catch (err) {
      res.status(500).send("Errore nell'eliminazione della notifica");
      console.error(err);
    }
  }

  static async readNotification(db, req, res) {
    const notificationId = req.body.NotificationId;
    const userId = req.session.account.StafferId;
    try {
      await NotificationModel.readNotification(notificationId, userId, db);
      res.status(200).send("Notifica letta con successo");
    } catch (err) {
      res.status(500).send("Errore nella lettura della notifica");
      console.error(err);
    }
  }

  static async deleteConversationNotifications(db, req, res) {
    const StafferId = req.query.StafferId;
    const UserId = req.query.UserId;
    try {
      await NotificationModel.deleteConversationNotifications(
        StafferId,
        UserId,
        db
      );
      res
        .status(200)
        .send("Notifiche della conversazione eliminate con successo");
    } catch (err) {
      res
        .status(500)
        .send("Errore nell'eliminazione delle notifiche della conversazione");
      console.error(err);
    }
  }
}

module.exports = NotificationController;
