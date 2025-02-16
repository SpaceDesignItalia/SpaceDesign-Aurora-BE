const fs = require("fs");
const path = require("path");
const Calendar = require("../Models/CalendarModel");
const EmailService = require("../middlewares/EmailService/EmailService");
const NotifyMiddleware = require("../middlewares/Notification/NotifyMiddelware");

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
      const UserId = req.session.account.StafferId;
      const partecipants = await Calendar.getPartecipantsByEventId(
        event.EventId,
        db
      );

      for (const partecipant of partecipants) {
        EmailService.sendNewEventMail(
          partecipant.EventPartecipantEmail,
          EventData.EventTitle,
          EventData.EventStartDate,
          EventData.EventEndDate,
          EventData.EventStartTime,
          EventData.EventEndTime,
          EventData.EventDescription,
          EventData.EventLocation,
          partecipants,
          process.env.FRONTEND_URL +
            "/comunications/calendar/" +
            event.EventId +
            "/" +
            partecipant.EventPartecipantEmail +
            "/accept",
          process.env.FRONTEND_URL +
            "/comunications/calendar/" +
            event.EventId +
            "/" +
            partecipant.EventPartecipantEmail +
            "/reject"
        );
      }

      await NotifyMiddleware.CalendarNotification(
        db,
        UserId,
        event.EventId,
        EventData.EventTitle
      );

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
      const event = await Calendar.getEventByEventId(eventId, db);

      if (event) {
        const partecipants = await Calendar.getPartecipantsByEventId(
          eventId,
          db
        );
        const attachments = await Calendar.getAttachmentsByEventId(eventId, db);
        event.EventPartecipants = partecipants;
        event.EventAttachments = attachments;
      }
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

  static async updateEvent(req, res, db) {
    try {
      const { Partecipants, Tag, EventData } = req.body;
      const event = await Calendar.updateEvent(
        Partecipants,
        Tag,
        EventData,
        db
      );

      const UserId = req.session.account.StafferId;

      for (const partecipant of Partecipants) {
        EmailService.sendUpdateEventMail(
          partecipant.EventPartecipantEmail,
          EventData.EventTitle,
          EventData.EventStartDate,
          EventData.EventEndDate,
          EventData.EventStartTime,
          EventData.EventEndTime,
          EventData.EventDescription,
          EventData.EventLocation,
          Partecipants,
          process.env.FRONTEND_URL +
            "/comunications/calendar/" +
            event.EventId +
            "/" +
            partecipant.EventPartecipantEmail +
            "/accept",
          process.env.FRONTEND_URL +
            "/comunications/calendar/" +
            event.EventId +
            "/" +
            partecipant.EventPartecipantEmail +
            "/reject"
        );
      }

      await NotifyMiddleware.CalendarNotification(
        db,
        UserId,
        event.EventId,
        EventData.EventTitle
      );

      res.status(200).json(event);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  }

  static async deleteEvent(req, res, db) {
    try {
      const { EventId } = req.query;
      const files = await Calendar.getAttachmentsByEventId(EventId, db);
      for (const file of files) {
        const fullFilePath = path.join(
          __dirname,
          "../public/uploads/calendarFiles",
          file.EventAttachmentUrl
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
      }

      const event = await Calendar.deleteEvent(EventId, db);
      res.status(200).json(event);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  }

  static async updateEventPartecipantStatus(req, res, db) {
    try {
      const { EventId, EventPartecipantEmail, EventPartecipantStatus } =
        req.body;
      const event = await Calendar.updateEventPartecipantStatus(
        EventId,
        EventPartecipantEmail,
        EventPartecipantStatus,
        db
      );
      res.status(200).json(event);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = CalendarController;
