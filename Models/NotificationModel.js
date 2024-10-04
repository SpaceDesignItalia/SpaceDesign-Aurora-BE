class NotificationModel {
  static getAllNotifications(userId, db) {
    return new Promise((resolve, reject) => {
      const query = `SELECT public."Notification"."NotificationId", "UserId", CONCAT("StafferName", ' ', "StafferSurname") AS UserFullName, "IsRead", "NotificationMessage", "NotificationCreationDate", public."NotificationInfo"."ProjectId", "ProjectName", "CompanyName", public."NotificationInfo"."StafferId", public."NotificationInfo"."CustomerId", "NotificationTypeName" FROM "NotificationExtraData"
        INNER JOIN public."Notification" ON public."Notification"."NotificationId" = "NotificationExtraData"."NotificationId"
        INNER JOIN public."NotificationInfo" ON public."Notification"."NotificationId" = "NotificationInfo"."NotificationId"
        LEFT JOIN public."Staffer" ON public."NotificationInfo"."StafferId" = public."Staffer"."StafferId"
        LEFT JOIN public."Customer" ON public."NotificationInfo"."CustomerId" = public."Customer"."CustomerId"
        LEFT JOIN public."Project" ON public."NotificationInfo"."ProjectId" = public."Project"."ProjectId"
        LEFT JOIN public."Company" ON public."Project"."CompanyId" = public."Company"."CompanyId"
        WHERE "UserId" = $1
        ORDER BY "NotificationId" DESC`;
      db.query(query, [userId], (err, result) => {
        if (err) {
          reject(err);
        }
        resolve(result.rows);
      });
    });
  }

  static deleteNotification(notificationId, userId, db) {
    return new Promise((resolve, reject) => {
      const query = `DELETE FROM public."NotificationExtraData" WHERE "NotificationId" = $1 AND "UserId" = $2`;
      db.query(query, [notificationId, userId], (err) => {
        if (err) {
          reject(err);
        }
        resolve();
      });
    });
  }

  static async readNotification(notificationId, userId, db) {
    return new Promise((resolve, reject) => {
      const query = `UPDATE public."NotificationExtraData" SET "IsRead" = TRUE WHERE "NotificationId" = $1 AND "UserId" = $2`;
      db.query(query, [notificationId, userId], (err) => {
        if (err) {
          reject(err);
        }
        resolve();
      });
    });
  }

  static async deleteConversationNotifications(StafferId, UserId, db) {
    return new Promise((resolve, reject) => {
      const query = `DELETE FROM public."NotificationExtraData"
        USING public."NotificationInfo"
        WHERE public."NotificationExtraData"."NotificationId" = public."NotificationInfo"."NotificationId"
        AND "StafferId" = $1 AND "UserId" = $2;
        `;
      db.query(query, [StafferId, UserId], (err) => {
        if (err) {
          reject(err);
        }
        resolve();
      });
    });
  }
}

module.exports = NotificationModel;
