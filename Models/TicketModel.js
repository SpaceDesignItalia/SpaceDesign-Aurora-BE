class TicketModel {
  static getAllTicketTypes(db) {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM public."TicketRequestType"`;

      db.query(query, (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result.rows);
        }
      });
    });
  }

  static getAllTicketStatusTypes(db) {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM public."TicketStatus"`;

      db.query(query, (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result.rows);
        }
      });
    });
  }

  static getProjectTicketOpen(db, ProjectId) {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM public."ProjectTicket" 
      INNER JOIN public."TicketRequestType" USING("TicketRequestTypeId") 
      INNER JOIN public."TicketStatus" USING("TicketStatusId") 
      WHERE "ProjectId" = $1`;

      db.query(query, [ProjectId], (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result.rows);
        }
      });
    });
  }

  static openNewTicket(db, TicketData, CustomerId) {
    return new Promise((resolve, reject) => {
      const query = `INSERT INTO public."ProjectTicket"(
	    "ProjectTicketTitle", "ProjectTicketDescription", "ProjectId", "CustomerId", "TicketRequestTypeId")
	    VALUES ($1, $2, $3, $4, $5);`;

      const values = [
        TicketData.ProjectTicketTitle,
        TicketData.ProjectTicketDescription,
        TicketData.ProjectId,
        CustomerId,
        TicketData.TicketRequestTypeId,
      ];
      db.query(query, values, (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      });
    });
  }

  static updateTicketStatus(db, ProjectTicketId, TicketStatusId) {
    return new Promise((resolve, reject) => {
      const query = `UPDATE public."ProjectTicket"
                     SET "TicketStatusId" = $1
                     WHERE "ProjectTicketId" = $2`;

      const values = [TicketStatusId, ProjectTicketId];
      db.query(query, values, (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      });
    });
  }

  static addTaskToTicket(db, taskId, ticketId) {
    return new Promise((resolve, reject) => {
      const query = `UPDATE public."ProjectTicket" SET "ProjectTaskId" = $1 WHERE "ProjectTicketId" = $2`;
      const values = [taskId, ticketId];
      db.query(query, values, (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      });
    });
  }
}

module.exports = TicketModel;
