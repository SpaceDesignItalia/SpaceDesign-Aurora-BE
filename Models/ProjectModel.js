class ProjectModel {
  static getAllStatus(db) {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM public."Status"`;

      db.query(query, (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result.rows);
        }
      });
    });
  }

  static getAllBanners(db) {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM public."ProjectBanner"`;

      db.query(query, (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result.rows);
        }
      });
    });
  }

  static getAllManagers(db) {
    return new Promise((resolve, reject) => {
      const query = `SELECT "ProjectId", CONCAT("ProjectName",' ',"ProjectSurname") AS "ProjectFullName", "ProjectEmail", "RoleName" FROM public."Project"
      INNER JOIN public."ProjectRole" USING("ProjectId")
      INNER JOIN public."Role" USING("RoleId")
      WHERE "RoleName" = 'CEO' OR "RoleName" = 'Project Manager'`;

      db.query(query, (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result.rows);
        }
      });
    });
  }

  static getAllProjects(db) {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM public."Project"`;

      db.query(query, (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result.rows);
        }
      });
    });
  }

  static getProjectByIdAndName(db, ProjectId, ProjectName) {
    return new Promise((resolve, reject) => {
      const query = `SELECT "ProjectId", "ProjectName", "ProjectDescription", "ProjectCreationDate", "ProjectEndDate", "CompanyId", "ProjectBannerId", "ProjectBannerPath", 
      "StatusName", "ProjectManagerId", CONCAT("ProjectName", ' ', "ProjectSurname") AS "ProjectManagerFullName", "ProjectEmail" AS "ProjectManagerEmail", "RoleName" FROM public."Project" 
      INNER JOIN public."ProjectBanner" USING("ProjectBannerId")
		  INNER JOIN public."Status" USING("StatusId")
			INNER JOIN public."Project" ON "ProjectManagerId" = "ProjectId"
      INNER JOIN public."ProjectRole" USING("ProjectId")
      INNER JOIN public."Role" USING("RoleId")
      WHERE "ProjectId" = $1 AND "ProjectName" = $2`;

      db.query(query, [ProjectId, ProjectName], (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result.rows[0]);
        }
      });
    });
  }

  static getAllLinkByProjectId(db, ProjectId) {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM public."ProjectLink" INNER JOIN public."ProjectLinkType" USING("ProjectLinkTypeId") WHERE "ProjectId" = $1`;

      db.query(query, [ProjectId], (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result.rows);
        }
      });
    });
  }

  static getAllLinkTypes(db) {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM public."ProjectLinkType"`;

      db.query(query, (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result.rows);
        }
      });
    });
  }

  static addProject(db, ProjectData) {
    return new Promise((resolve, reject) => {
      const query = `INSERT INTO public."Project"("ProjectName", "ProjectDescription", "ProjectEndDate", "ProjectManagerId", "ProjectBanner", "CompanyId")
      VALUES ($1, $2, $3, $4, $5, $6);`;

      const values = [
        ProjectData.ProjectName,
        ProjectData.ProjectDescription,
        ProjectData.ProjectEndDate,
        ProjectData.ProjectManagerId,
        ProjectData.ProjectBannerId,
        ProjectData.CompanyId,
      ];

      db.query(query, values, (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result.rows[0].ProjectId);
        }
      });
    });
  }

  static addProjectLink(db, ProjectLinkData) {
    return new Promise((resolve, reject) => {
      const query = `INSERT INTO public."ProjectLink"("ProjectId", "ProjectLinkTitle", "ProjectLinkUrl", "ProjectLinkTypeId")
	    VALUES ($1, $2, $3, $4);`;

      const values = [
        ProjectLinkData.ProjectId,
        ProjectLinkData.ProjectLinkTitle,
        ProjectLinkData.ProjectLinkUrl,
        ProjectLinkData.ProjectLinkTypeId,
      ];

      db.query(query, values, (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result.rows);
        }
      });
    });
  }

  static updateProjectTheme(db, ProjectId, ProjectBannerId) {
    return new Promise((resolve, reject) => {
      const query = `UPDATE public."Project" SET "ProjectBannerId" = $1 WHERE "ProjectId" = $2`;

      const values = [ProjectBannerId, ProjectId];

      db.query(query, values, (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result.rows);
        }
      });
    });
  }

  static getConversationByProjectId(db, ProjectId) {
    return new Promise((resolve, reject) => {
      const query = `SELECT public."Conversation"."ConversationId" FROM public."Conversation"WHERE "ProjectId" = $1`;

      db.query(query, [ProjectId], (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result.rows);
        }
      });
    });
  }

  static createProjectConversation(db, ProjectId) {
    return new Promise((resolve, reject) => {
      const query = `INSERT INTO public."Conversation"("ProjectId") VALUES ($1);`;

      db.query(query, [ProjectId], (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result.rows);
        }
      });
    });
  }

  static getMessagesByConversationId(db, ConversationId) {
    console.log("ConversationId", ConversationId);
    return new Promise((resolve, reject) => {
      const query = `SELECT public."Message"."MessageId", public."Message"."StafferSenderId", public."Message"."ConversationId", public."Message"."Date", public."Message"."Text", 
                        CONCAT(public."Staffer"."StafferName", ' ', public."Staffer"."StafferSurname") AS "StafferSenderFullName"
                      FROM public."Message" 
                      INNER JOIN public."Staffer" 
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
}

module.exports = ProjectModel;
