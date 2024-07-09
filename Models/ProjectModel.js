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
      const query = `SELECT "StafferId", CONCAT("StafferName",' ',"StafferSurname") AS "StafferFullName", "StafferEmail", "RoleName" FROM public."Staffer"
      INNER JOIN public."StafferRole" USING("StafferId")
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
      "StatusName", "ProjectManagerId", "StafferImageUrl", CONCAT("StafferName", ' ', "StafferSurname") AS "ProjectManagerFullName", "StafferEmail" AS "ProjectManagerEmail", "RoleName" FROM public."Project" 
      INNER JOIN public."ProjectBanner" USING("ProjectBannerId")
		  INNER JOIN public."Status" USING("StatusId")
			INNER JOIN public."Staffer" ON "ProjectManagerId" = "StafferId"
      INNER JOIN public."StafferRole" USING("StafferId")
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

  static getProjectStatus(db, ProjectId) {
    return new Promise((resolve, reject) => {
      const query = `SELECT "StatusId" FROM public."Project" WHERE "ProjectId" = $1`;

      db.query(query, [ProjectId], (error, result) => {
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

  static getProjectTeamMembers(db, ProjectId) {
    return new Promise((resolve, reject) => {
      const query = `SELECT "StafferId", CONCAT("StafferName", ' ', "StafferSurname") AS "StafferFullName", "StafferImageUrl", "StafferEmail", "RoleName" FROM public."ProjectTeam" 
      INNER JOIN public."Staffer" USING("StafferId")
      INNER JOIN public."StafferRole" USING("StafferId")
      INNER JOIN public."Role" USING("RoleId")
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

  static getMembersNotInProjectTeam(db, ProjectId) {
    return new Promise((resolve, reject) => {
      const query = `SELECT "StafferId", CONCAT("StafferName",' ',"StafferSurname") AS "StafferFullName", "StafferEmail", "StafferImageUrl", "RoleName" FROM public."Staffer" 
      INNER JOIN public."StafferRole" USING("StafferId")
      INNER JOIN public."Role" USING("RoleId") 
      WHERE "StafferId" NOT IN (
          SELECT "StafferId"
          FROM public."ProjectTeam"
          WHERE "ProjectId" = $1);
      `;

      db.query(query, [ProjectId], (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result.rows);
        }
      });
    });
  }

  static getTaskToDo(db, ProjectId) {
    return new Promise((resolve, reject) => {
      const query = `SELECT COUNT(*) AS "TasksNumber" FROM public."ProjectTask" 
      INNER JOIN public."ProjectTaskStatus" USING("ProjectTaskStatusId") 
      WHERE "ProjectTaskStatusId" = 1  AND  "ProjectId"  =  $1`;

      db.query(query, [ProjectId], (error, result) => {
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
      const query = `INSERT INTO public."Project"("ProjectName", "ProjectDescription", "ProjectEndDate", "ProjectManagerId", "ProjectBannerId", "CompanyId")
      VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`;

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
          const query = `INSERT INTO public."ProjectTeam" ("ProjectId", "StafferId") VALUES ($1, $2) RETURNING *`;

          const values = [
            result.rows[0].ProjectId,
            ProjectData.ProjectManagerId,
          ];

          db.query(query, values, (error, result) => {
            if (error) {
              reject(error);
            } else {
              resolve(result.rows[0].ProjectId);
            }
          });
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

  static addProjectTeamMember(db, ProjectId, ProjectMemberId) {
    return new Promise((resolve, reject) => {
      const query = `INSERT INTO public."ProjectTeam"("ProjectId", "StafferId")
	    VALUES ($1, $2);`;

      const values = [ProjectId, ProjectMemberId];

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

  static updateProject(db, ProjectData) {
    return new Promise((resolve, reject) => {
      const query = `UPDATE public."Project" SET "ProjectName" = $1, "ProjectDescription" = $2, "ProjectCreationDate" = $3, 
      "ProjectEndDate" = $4, "ProjectManagerId" = $5, "CompanyId" = $6, "StatusId" = $7 WHERE "ProjectId" = $8`;

      const values = [
        ProjectData.ProjectName,
        ProjectData.ProjectDescription,
        ProjectData.ProjectCreationDate,
        ProjectData.ProjectEndDate,
        ProjectData.ProjectManagerId,
        ProjectData.CompanyId,
        ProjectData.StatusId,
        ProjectData.ProjectId,
      ];

      db.query(query, values, (err, result) => {
        if (err) {
          reject(err);
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

  static removeMemberFromProjectById(db, StafferId, ProjectId) {
    return new Promise((resolve, reject) => {
      const query = `DELETE FROM public."ProjectTeam" WHERE "StafferId" = $1 AND "ProjectId" = $2`;

      const values = [StafferId, ProjectId];

      db.query(query, values, (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result.rows);
        }
      });
    });
  }

  static removeLinkFromProject(db, ProjectLinkId, ProjectId) {
    return new Promise((resolve, reject) => {
      const query = `DELETE FROM public."ProjectLink" WHERE "ProjectLinkId" = $1 AND "ProjectId" = $2`;

      const values = [ProjectLinkId, ProjectId];

      db.query(query, values, (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result.rows);
        }
      });
    });
  }

  static deleteProject(db, ProjectId) {
    return new Promise((resolve, reject) => {
      const query = `DELETE FROM public."Project" WHERE "ProjectId" = $1`;
      db.query(query, [ProjectId], (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result.rows);
        }
      });
    });
  }

  static getTasksByProjectId(db, ProjectId) {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM public."ProjectTask" WHERE "ProjectId" = $1`;

      db.query(query, [ProjectId], (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result.rows);
        }
      });
    });
  }

  static getTaskStatuses(db) {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM public."ProjectTaskStatus"`;

      db.query(query, (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result.rows);
        }
      });
    });
  }

  static updateTaskStatus(db, ProjectTaskId, ProjectTaskStatusId) {
    return new Promise((resolve, reject) => {
      const query = `UPDATE public."ProjectTask" SET "ProjectTaskStatusId" = $1 WHERE "ProjectTaskId" = $2`;

      const values = [ProjectTaskStatusId, ProjectTaskId];

      db.query(query, values, (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result.rows);
        }
      });
    });
  }

  static getTagsByTaskId(db, ProjectTaskId) {
    return new Promise((resolve, reject) => {
      const query = `SELECT "ProjectTaskTag"."ProjectTaskTagId", "ProjectTaskTag"."ProjectTaskTagName" FROM public."ProjectTaskTag" JOIN public."ProjectTasksTags" USING("ProjectTaskTagId") WHERE "ProjectTaskId" = $1`;

      db.query(query, [ProjectTaskId], (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result.rows);
        }
      });
    });
  }

  static getMembersByTaskId(db, ProjectTaskId) {
    return new Promise((resolve, reject) => {
      const query = `SELECT "StafferId", CONCAT("StafferName", ' ', "StafferSurname") AS "StafferFullName", "StafferImageUrl", "StafferEmail" FROM public."ProjectTaskTeam" 
      INNER JOIN public."Staffer" USING("StafferId")
      WHERE "ProjectTaskId" = $1`;

      db.query(query, [ProjectTaskId], (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result.rows);
        }
      });
    });
  }

  static getMembersNotInTask(db, TaskData) {
    return new Promise((resolve, reject) => {
      const query = `SELECT "StafferId", CONCAT("StafferName",' ',"StafferSurname") AS "StafferFullName", "StafferEmail", "StafferImageUrl" FROM public."Staffer" 
      WHERE "StafferId" NOT IN (
          SELECT "StafferId"
          FROM public."ProjectTaskTeam"
          WHERE "ProjectTaskId" = $1)
          AND "StafferId" IN (
            SELECT "StafferId"
            FROM public."ProjectTeam"
            WHERE "ProjectId" = $2);
      `;

      db.query(
        query,
        [TaskData.ProjectTaskId, TaskData.ProjectId],
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result.rows);
          }
        }
      );
    });
  }

  static getTagsNotInTask(db, TaskData) {
    return new Promise((resolve, reject) => {
      const query = `SELECT "ProjectTaskTagId", "ProjectTaskTagName" FROM public."ProjectTaskTag" 
      WHERE "ProjectTaskTagId" NOT IN (
          SELECT "ProjectTaskTagId"
          FROM public."ProjectTasksTags"
          WHERE "ProjectTaskId" = $1);
      `;

      db.query(query, [TaskData.ProjectTaskId], (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result.rows);
        }
      });
    });
  }

  static addTaskMember(db, TaskData, MemberData) {
    return new Promise((resolve, reject) => {
      const query = `INSERT INTO public."ProjectTaskTeam"("ProjectTaskId", "StafferId")
      VALUES ($1, $2);`;

      const values = [TaskData.ProjectTaskId, MemberData.StafferId];

      db.query(query, values, (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result.rows);
        }
      });
    });
  }

  static addTaskTag(db, TaskData, TagData) {
    return new Promise((resolve, reject) => {
      const query = `INSERT INTO public."ProjectTasksTags"("ProjectTaskId", "ProjectTaskTagId")
      VALUES ($1, $2);`;

      const values = [TaskData.ProjectTaskId, TagData.ProjectTaskTagId];

      db.query(query, values, (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result.rows);
        }
      });
    });
  }

  static getTaskByTaskId(db, ProjectTaskId) {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM public."ProjectTask" WHERE "ProjectTaskId" = $1`;

      db.query(query, [ProjectTaskId], (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result.rows[0]);
        }
      });
    });
  }

  static deleteTaskMember(db, ProjectTaskId, StafferId) {
    return new Promise((resolve, reject) => {
      const query = `DELETE FROM public."ProjectTaskTeam" WHERE "ProjectTaskId" = $1 AND "StafferId" = $2`;

      const values = [ProjectTaskId, StafferId];

      db.query(query, values, (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result.rows);
        }
      });
    });
  }

  static deleteTaskTag(db, ProjectTaskId, ProjectTaskTagId) {
    return new Promise((resolve, reject) => {
      const query = `DELETE FROM public."ProjectTasksTags" WHERE "ProjectTaskId" = $1 AND "ProjectTaskTagId" = $2`;

      const values = [ProjectTaskId, ProjectTaskTagId];

      db.query(query, values, (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result.rows);
        }
      });
    });
  }

  static updateTask(db, TaskData, FormattedDate) {
    return new Promise((resolve, reject) => {
      const query = `UPDATE public."ProjectTask" SET "ProjectTaskName" = $1, "ProjectTaskDescription" = $2, "ProjectTaskExpiration" = $3 WHERE "ProjectTaskId" = $4`;

      const values = [
        TaskData.ProjectTaskName,
        TaskData.ProjectTaskDescription,
        FormattedDate,
        TaskData.ProjectTaskId,
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

  static getAllTags(db) {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM public."ProjectTaskTag"`;

      db.query(query, (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result.rows);
        }
      });
    });
  }

  static searchProjectByName(db, ProjectName) {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM public."Project" WHERE "ProjectName" LIKE '%${ProjectName}%'`;

      db.query(query, (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result.rows);
        }
      });
    });
  }

  static getProjectInTeam(db, StafferId) {
    return new Promise((resolve, reject) => {
      const query = `SELECT "ProjectId", "ProjectName" FROM public."ProjectTeam" 
      INNER JOIN public."Project" USING("ProjectId") WHERE "StafferId" = $1`;

      db.query(query, [StafferId], (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result.rows);
        }
      });
    });
  }

  static addTask(db, TaskData, FormattedDate) {
    return new Promise((resolve, reject) => {
      const query = `INSERT INTO public."ProjectTask"("ProjectTaskName", "ProjectTaskDescription", "ProjectTaskExpiration", "ProjectId")
      VALUES ($1, $2, $3, $4) RETURNING *`;

      const values = [
        TaskData.ProjectTaskName,
        TaskData.ProjectTaskDescription,
        FormattedDate,
        TaskData.ProjectId,
      ];

      db.query(query, values, (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result.rows[0]);
        }
      });
    });
  }

  static addMemberToTask(db, ProjectTaskId, StafferId) {
    return new Promise((resolve, reject) => {
      const query = `INSERT INTO public."ProjectTaskTeam"("ProjectTaskId", "StafferId")
      VALUES ($1, $2) RETURNING *`;

      const values = [ProjectTaskId, StafferId];

      db.query(query, values, (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result.rows[0]);
        }
      });
    });
  }

  static addTagToTask(db, ProjectTaskId, ProjectTaskTagId) {
    return new Promise((resolve, reject) => {
      const query = `INSERT INTO public."ProjectTasksTags"("ProjectTaskId", "ProjectTaskTagId")
      VALUES ($1, $2) RETURNING *`;

      const values = [ProjectTaskId, ProjectTaskTagId];

      db.query(query, values, (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result.rows[0]);
        }
      });
    });
  }

  static deleteTask(db, ProjectTaskId) {
    return new Promise((resolve, reject) => {
      const query = `DELETE FROM public."ProjectTask" WHERE "ProjectTaskId" = $1`;

      db.query(query, [ProjectTaskId], (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result.rows);
        }
      });
    });
  }

  static deleteTaskMembers(db, ProjectTaskId) {
    return new Promise((resolve, reject) => {
      const query = `DELETE FROM public."ProjectTaskTeam" WHERE "ProjectTaskId" = $1`;

      db.query(query, [ProjectTaskId], (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result.rows);
        }
      });
    });
  }

  static deleteTaskTags(db, ProjectTaskId) {
    return new Promise((resolve, reject) => {
      const query = `DELETE FROM public."ProjectTasksTags" WHERE "ProjectTaskId" = $1`;

      db.query(query, [ProjectTaskId], (error, result) => {
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
