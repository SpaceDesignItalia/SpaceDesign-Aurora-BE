const fs = require("fs");
const path = require("path");
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
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  }

  static async getEventByEventId(req, res, db) {
    try {
      const { eventId } = req.query;
      console.log(eventId);
      const event = await Calendar.getEventByEventId(eventId, db);
      const partecipants = await Calendar.getPartecipantsByEventId(eventId, db);
      const attachments = await Calendar.getAttachmentsByEventId(eventId, db);
      event.EventPartecipants = partecipants;
      event.EventAttachments = attachments;
      console.log(event);
      res.status(200).json(event);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  }

  static async uploadEventAttachment(req, res, db) {
    try {
      const { EventId } = req.body;
      const files = req.files;

      const fileData = files.map((file) => ({
        fileName: file.originalname,
        filePath: `/${file.filename}`,
      }));

      const attachments = await Calendar.uploadEventAttachment(
        EventId,
        fileData,
        db
      );
      res.status(200).json(attachments);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  }

  static async deleteEventAttachment(req, res, db) {
    try {
      const { EventAttachmentId, EventAttachmentUrl } = req.query;

      console.log(EventAttachmentId, EventAttachmentUrl);

      const fullFilePath = path.join(
        __dirname,
        "../public/uploads/calendarFiles",
        EventAttachmentUrl
      );

      if (fs.existsSync(fullFilePath)) {
        fs.unlink(fullFilePath, (err) => {
          if (err) {
            console.error("Error deleting file:", err);
          }
        });
      } else {
        console.error("File not found");
      }

      const attachment = await Calendar.deleteEventAttachment(
        EventAttachmentId,
        db
      );
      res.status(200).json(attachment);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = CalendarController;
