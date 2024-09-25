const NotificationModel = require("../Models/NotificationModel");

class NotificationController {
  static async getAllNotifications(db, req, res) {
    const userId = req.session.account.StafferId;
    console.log(userId);
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
}

module.exports = NotificationController;
