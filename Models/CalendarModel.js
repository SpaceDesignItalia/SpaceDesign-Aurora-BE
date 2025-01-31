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
    console.log(email);
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM public."Event" 
      LEFT JOIN public."EventAttachment" ON "EventAttachment"."EventId" = "Event"."EventId"
      INNER JOIN public."EventTag" ON "EventTag"."EventTagId" = "Event"."EventTagId"
      LEFT JOIN public."EventPartecipant" ON "EventPartecipant"."EventId" = "Event"."EventId"
      WHERE "EventPartecipant"."EventPartecipantEmail" = $1;`;
      db.query(query, [email], (error, result) => {
        if (error) {
          reject(error);
        } else {
          console.log(result.rows);
          resolve(result.rows);
        }
      });
    });
  }
}

module.exports = CalendarModel;
