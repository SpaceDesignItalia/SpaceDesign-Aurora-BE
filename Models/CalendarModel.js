const { v4: uuidv4 } = require("uuid");

class CalendarModel {
  static getEventTags(db) {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM public."EventTag";`;
      db.query(query, (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result.rows);
        }
      });
    });
  }

  static addEvent(EventData, db) {
    return new Promise((resolve, reject) => {
      const eventId = uuidv4();

      const query = `INSERT INTO public."Event" 
      ("EventId", "EventColor", "EventTitle", "EventDescription", "EventEndDate", "EventStartDate", "EventTagId", "EventStartTime", "EventEndTime", "EventLocation") 
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      RETURNING "EventId";`;

      db.query(
        query,
        [
          eventId,
          EventData.EventColor,
          EventData.EventTitle,
          EventData.EventDescription,
          EventData.EventEndDate,
          EventData.EventStartDate,
          EventData.EventTagId,
          EventData.EventStartTime,
          EventData.EventEndTime,
          EventData.EventLocation,
        ],
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            const partecipantsQuery = `INSERT INTO public."EventPartecipant" ("EventId", "EventPartecipantEmail", "EventPartecipantRole") VALUES ($1, $2, $3);`;
            for (const partecipant of EventData.EventPartecipants) {
              db.query(
                partecipantsQuery,
                [
                  eventId,
                  partecipant.EventPartecipantEmail,
                  partecipant.EventPartecipantRole,
                ],
                (error, result) => {
                  if (error) {
                    reject(error);
                  } else {
                    resolve(result.rows);
                  }
                }
              );
            }
          }
        }
      );
    });
  }

  static getEventsByEmail(email, db) {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM public."Event" 
      INNER JOIN public."EventTag" ON "EventTag"."EventTagId" = "Event"."EventTagId"
      INNER JOIN public."EventPartecipant" ON "EventPartecipant"."EventId" = "Event"."EventId"
      WHERE "EventPartecipant"."EventPartecipantEmail" = $1
      GROUP BY "Event"."EventId", "EventTag"."EventTagId", "EventPartecipant"."EventPartecipantId";`;
      db.query(query, [email], (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result.rows);
        }
      });
    });
  }

  static getEventByEventId(eventId, db) {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM public."Event" 
      INNER JOIN public."EventTag" ON "EventTag"."EventTagId" = "Event"."EventTagId"
      WHERE "Event"."EventId" = $1;`;
      db.query(query, [eventId], (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result.rows[0]);
        }
      });
    });
  }

  static getPartecipantsByEventId(eventId, db) {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM public."EventPartecipant" WHERE "EventId" = $1;`;
      db.query(query, [eventId], (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result.rows);
        }
      });
    });
  }

  static getAttachmentsByEventId(eventId, db) {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM public."EventAttachment" WHERE "EventId" = $1;`;
      db.query(query, [eventId], (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result.rows);
        }
      });
    });
  }

  static uploadEventAttachment(eventId, fileData, db) {
    return new Promise((resolve, reject) => {
      const query = `INSERT INTO public."EventAttachment" ("EventId", "EventAttachmentName", "EventAttachmentUrl") VALUES ($1, $2, $3);`;
      for (const file of fileData) {
        db.query(
          query,
          [eventId, file.fileName, file.filePath],
          (error, result) => {
            if (error) {
              reject(error);
            } else {
              resolve(result.rows);
            }
          }
        );
      }
    });
  }

  static deleteEventAttachment(eventAttachmentId, db) {
    return new Promise((resolve, reject) => {
      const query = `DELETE FROM public."EventAttachment" WHERE "EventAttachmentId" = $1;`;
      db.query(query, [eventAttachmentId], (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result.rows);
        }
      });
    });
  }
}

module.exports = CalendarModel;
