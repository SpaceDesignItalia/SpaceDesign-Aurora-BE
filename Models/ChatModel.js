class ChatModel {
    static getConversationByStafferId(db, StafferId) {
      return new Promise((resolve, reject) => {
        const query = `SELECT 
              public."Conversation"."ConversationId",
              public."Conversation"."Staffer1Id",
              public."Conversation"."Staffer2Id",
              CONCAT(staffer1."StafferName", ' ', staffer1."StafferSurname") AS "Staffer1FullName",
              CONCAT(staffer2."StafferName", ' ', staffer2."StafferSurname") AS "Staffer2FullName"
          FROM 
              public."Conversation"
          INNER JOIN 
              public."Staffer" AS staffer1 ON public."Conversation"."Staffer1Id" = staffer1."StafferId"
          LEFT JOIN 
              public."Staffer" AS staffer2 ON public."Conversation"."Staffer2Id" = staffer2."StafferId"
          WHERE 
              "Staffer1Id" = $1 OR "Staffer2Id" = $1 
          ORDER BY 
              "ConversationId" DESC;
          `;
  
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
        const query = `SELECT * FROM public."Message" WHERE "ConversationId" = $1 ORDER BY "Date" ASC;`;
        
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
}

module.exports = ChatModel;
