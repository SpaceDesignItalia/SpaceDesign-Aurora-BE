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
        async (error, result) => {
          if (error) {
            reject(error);
          } else {
            try {
              const partecipantsQuery = `INSERT INTO public."EventPartecipant" ("EventId", "EventPartecipantEmail", "EventPartecipantRole") VALUES ($1, $2, $3)`;
              const promises = EventData.EventPartecipants.map(
                (partecipant) => {
                  return db.query(partecipantsQuery, [
                    eventId,
                    partecipant.EventPartecipantEmail,
                    partecipant.EventPartecipantRole,
                  ]);
                }
              );

              await Promise.all(promises);
              resolve({ EventId: eventId });
            } catch (err) {
              reject(err);
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
    console.log("eventId:", eventId);
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

  static updateEvent(partecipants, tag, eventData, db) {
    return new Promise((resolve, reject) => {
      const query = `UPDATE public."Event" SET "EventTitle" = $1, "EventDescription" = $2, 
      "EventEndDate" = $3, "EventStartDate" = $4, "EventStartTime" = $5, "EventEndTime" = $6, 
      "EventLocation" = $7, "EventTagId" = $8 
      WHERE "EventId" = $9;`;
      db.query(
        query,
        [
          eventData.EventTitle,
          eventData.EventDescription,
          eventData.EventEndDate,
          eventData.EventStartDate,
          eventData.EventStartTime,
          eventData.EventEndTime,
          eventData.EventLocation,
          tag,
          eventData.EventId,
        ],
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result.rows);

            const deletePartecipantsQuery = `DELETE FROM public."EventPartecipant" WHERE "EventId" = $1;`;
            db.query(
              deletePartecipantsQuery,
              [eventData.EventId],
              (error, result) => {
                if (error) {
                  reject(error);
                } else {
                  resolve(result.rows);
                }
              }
            );

            for (const partecipant of partecipants) {
              const partecipantQuery = `INSERT INTO public."EventPartecipant" 
              ("EventId", "EventPartecipantEmail", "EventPartecipantRole") 
              VALUES ($1, $2, $3);`;
              db.query(
                partecipantQuery,
                [
                  eventData.EventId,
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

  static deleteEvent(eventId, db) {
    return new Promise((resolve, reject) => {
      const query = `DELETE FROM public."Event" WHERE "EventId" = $1;`;
      db.query(query, [eventId], (error, result) => {
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
