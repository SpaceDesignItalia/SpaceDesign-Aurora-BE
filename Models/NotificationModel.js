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
}

module.exports = NotificationModel;
