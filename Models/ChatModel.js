class ChatModel {
  static getConversationByStafferId(db, StafferId) {
    return new Promise((resolve, reject) => {
      const query = `SELECT 
    public."Conversation"."ConversationId",
    public."Conversation"."Staffer1Id",
    public."Conversation"."Staffer2Id",
    staffer1."StafferImageUrl" AS "Staffer1ImageUrl",
    staffer2."StafferImageUrl" AS "Staffer2ImageUrl",
    CONCAT(staffer1."StafferName", ' ', staffer1."StafferSurname") AS "Staffer1FullName",
    CONCAT(staffer2."StafferName", ' ', staffer2."StafferSurname") AS "Staffer2FullName",
    COALESCE(SUM(
        CASE 
            WHEN extra."UserId" = $1 
            AND (
                (notification."StafferId" = public."Conversation"."Staffer1Id" AND public."Conversation"."Staffer2Id" = $1)
                OR (notification."StafferId" = public."Conversation"."Staffer2Id" AND public."Conversation"."Staffer1Id" = $1)
            )
            THEN 1 
            ELSE 0 
        END
    ), 0) AS "notificationCount"
FROM 
    public."Conversation"
LEFT JOIN 
    public."Staffer" AS staffer1 ON public."Conversation"."Staffer1Id" = staffer1."StafferId"
LEFT JOIN 
    public."Staffer" AS staffer2 ON public."Conversation"."Staffer2Id" = staffer2."StafferId"
LEFT JOIN 
    public."NotificationInfo" AS notification ON 
        (notification."StafferId" = public."Conversation"."Staffer1Id"
        OR notification."StafferId" = public."Conversation"."Staffer2Id")
        AND notification."NotificationTypeName" = 'Dipendente'
LEFT JOIN 
    public."NotificationExtraData" AS extra ON notification."NotificationId" = extra."NotificationId"
WHERE 
    (public."Conversation"."Staffer1Id" = $1 OR public."Conversation"."Staffer2Id" = $1)
GROUP BY 
    public."Conversation"."ConversationId", 
    staffer1."StafferName", 
    staffer1."StafferSurname", 
    staffer1."StafferImageUrl", 
    staffer2."StafferName", 
    staffer2."StafferSurname", 
    staffer2."StafferImageUrl"
ORDER BY 
    public."Conversation"."ConversationId" DESC;`;

      db.query(query, [StafferId], (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result.rows);
        }
      });
    });
  }

  static getMessagesByConversationId(db, ConversationId) {
    return new Promise((resolve, reject) => {
      const query = `SELECT public."Message"."MessageId", public."Message"."StafferSenderId", public."Message"."ConversationId", public."Message"."Date", public."Message"."Text", 
      CONCAT(public."Staffer"."StafferName", ' ', public."Staffer"."StafferSurname") AS "StafferSenderFullName", public."Staffer"."StafferImageUrl"
      FROM public."Message" INNER JOIN public."Staffer" 
      ON public."Staffer"."StafferId" = public."Message"."StafferSenderId"
      WHERE "ConversationId" = $1 
      ORDER BY "Date" ASC`;

      db.query(query, [ConversationId], (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result.rows);
        }
      });
    });
  }

  static sendMessage(db, ConversationId, StafferSenderId, Text) {
    return new Promise((resolve, reject) => {
      const query = `INSERT INTO public."Message" ("ConversationId", "StafferSenderId", "Text", "Date") VALUES ($1, $2, $3, NOW());`;

      db.query(query, [ConversationId, StafferSenderId, Text], (error) => {
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      });
    });
  }

  static SendCustomerMessage(db, ConversationId, StafferSenderId, Text) {
    return new Promise((resolve, reject) => {
      const query = `INSERT INTO public."Message" ("ConversationId", "StafferSenderId", "Text", "Date", "IsCustomer") VALUES ($1, $2, $3, NOW(), $4);`;

      db.query(
        query,
        [ConversationId, StafferSenderId, Text, true],
        (error) => {
          if (error) {
            reject(error);
          } else {
            resolve();
          }
        }
      );
    });
  }

  static getConversationByStaffersId(db, Staffer1Id, Staffer2Id) {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM public."Conversation" WHERE ("Staffer1Id" = $1 AND "Staffer2Id" = $2) OR ("Staffer1Id" = $2 AND "Staffer2Id" = $1);`;

      db.query(query, [Staffer1Id, Staffer2Id], (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result.rows);
        }
      });
    });
  }

  static findStaffersWithoutMessagesFromLoggedStaffer(db, LoggedStaffer) {
    return new Promise((resolve, reject) => {
      const query = `SELECT "StafferId", CONCAT("StafferName", ' ', "StafferSurname") AS "StafferFullName", "StafferImageUrl" FROM public."Staffer" s
      WHERE s."StafferId" <> $1 AND s."StafferId" NOT IN (
      SELECT c."Staffer2Id"
      FROM public."Conversation" c
      WHERE c."Staffer1Id" = $2);`;

      const values = [LoggedStaffer, LoggedStaffer];
      db.query(query, values, (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result.rows);
        }
      });
    });
  }

  static createConversation(db, Staffer1Id, Staffer2Id) {
    return new Promise((resolve, reject) => {
      const query = `INSERT INTO public."Conversation" ("Staffer1Id", "Staffer2Id") VALUES ($1, $2) RETURNING "ConversationId";`;

      db.query(query, [Staffer1Id, Staffer2Id], (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result.rows[0].ConversationId);
        }
      });
    });
  }

  static deleteConversationByConversationId(db, ConversationId) {
    return new Promise((resolve, reject) => {
      const query = `DELETE FROM public."Conversation" WHERE "ConversationId" = $1;`;

      db.query(query, [ConversationId], (error) => {
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      });
    });
  }
}

module.exports = ChatModel;
