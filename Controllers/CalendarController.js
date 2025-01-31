const Calendar = require("../Models/CalendarModel");

class CalendarController {
  static async getEventTags(req, res, db) {
    try {
      const eventTags = await Calendar.getEventTags(db);
      res.status(200).json(eventTags);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async addEvent(req, res, db) {
    try {
      const { EventData } = req.body;
      const event = await Calendar.addEvent(EventData, db);
      res.status(200).json(event);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  }

  static async getEventsByEmail(req, res, db) {
    try {
      let events = [];
      if (req.session.account.StafferEmail) {
        events = await Calendar.getEventsByEmail(
          req.session.account.StafferEmail,
          db
        );
      } else {
        events = await Calendar.getEventsByEmail(
          req.session.account.CustomerEmail,
          db
        );
      }
      res.status(200).json(events);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = CalendarController;
