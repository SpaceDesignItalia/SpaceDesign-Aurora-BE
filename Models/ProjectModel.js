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
      const query = `SELECT "StafferId", CONCAT("StafferName",' ',"StafferSurname") AS "StafferFullName", "StafferEmail", "RoleName", "StafferImageUrl" FROM public."Staffer"
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

  static getAllProjectsTable(db, StafferId) {
    return new Promise((resolve, reject) => {
      const query = `SELECT "ProjectId", "ProjectName", "ProjectCreationDate", "ProjectEndDate", CONCAT("StafferName",' ',"StafferSurname") AS "ProjectManagerName", 
      "StafferImageUrl", "RoleName", "StatusId", "StatusName", "CompanyId", "CompanyName", "UniqueCode"
      FROM public."Project" 
      INNER JOIN public."Staffer" s ON "ProjectManagerId" = s."StafferId" 
      INNER JOIN public."StafferRole" USING ("StafferId") 
      INNER JOIN public."Role" USING("RoleId") 
      INNER JOIN public."ProjectTeam" USING("ProjectId")
      INNER JOIN public."Status" USING("StatusId")
      LEFT JOIN public."Company" USING("CompanyId")
      WHERE public."ProjectTeam"."StafferId" = $1`;

      db.query(query, [StafferId], (error, result) => {
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

  static getTotalTasks(db, ProjectId) {
    return new Promise((resolve, reject) => {
      const query = `SELECT COUNT(*) AS "TotalTasks" FROM public."ProjectTask" 
      INNER JOIN public."ProjectTaskStatus" USING("ProjectTaskStatusId") 
      WHERE "ProjectTaskStatusId" <> 4  AND  "ProjectId"  =  $1`;

      db.query(query, [ProjectId], (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result.rows);
        }
      });
    });
  }

  static getTotalTeamMembers(db, ProjectId) {
    return new Promise((resolve, reject) => {
      const query = `SELECT COUNT(*) AS "TotalTeamMembers" FROM public."ProjectTeam" 
      WHERE "ProjectId"  =  $1`;

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
      // Step 1: Check if a project with the same name already exists for the same company
      const checkDuplicateQuery = `
            SELECT "ProjectId" FROM public."Project"
            WHERE "ProjectName" = $1 AND "CompanyId" = $2;
        `;

      db.query(
        checkDuplicateQuery,
        [ProjectData.ProjectName, ProjectData.CompanyId],
        (checkError, checkResult) => {
          if (checkError) {
            return reject(checkError);
          }

          // If a project with the same name exists, reject with a conflict error
          if (checkResult.rows.length > 0) {
            const conflictError = new Error(
              "A project with this name already exists for the specified company."
            );
            conflictError.statusCode = 409; // Conflict
            return reject(conflictError);
          }

          // Step 2: Insert the new project if no conflict
          const insertProjectQuery = `
                    INSERT INTO public."Project"("ProjectName", "ProjectDescription", "ProjectEndDate", "ProjectManagerId", "ProjectBannerId", "CompanyId")
                    VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;
                `;

          const projectValues = [
            ProjectData.ProjectName,
            ProjectData.ProjectDescription,
            ProjectData.ProjectEndDate,
            ProjectData.ProjectManagerId,
            ProjectData.ProjectBannerId,
            ProjectData.CompanyId,
          ];

          db.query(
            insertProjectQuery,
            projectValues,
            (insertError, insertResult) => {
              if (insertError) {
                return reject(insertError);
              }

              const projectId = insertResult.rows[0].ProjectId;

              // Step 3: Insert the project manager into the ProjectTeam
              const insertTeamQuery = `
                        INSERT INTO public."ProjectTeam" ("ProjectId", "StafferId")
                        VALUES ($1, $2) RETURNING *;
                    `;

              db.query(
                insertTeamQuery,
                [projectId, ProjectData.ProjectManagerId],
                (teamError, teamResult) => {
                  if (teamError) {
                    return reject(teamError);
                  }

                  // Step 4: Create a default folder for the project
                  const insertFolderQuery = `
                            INSERT INTO public."ProjectFolder" ("ProjectId", "FolderName", "CustomerVisible", "TeamVisible")
                            VALUES ($1, 'Default', false, true) RETURNING *;
                        `;

                  db.query(
                    insertFolderQuery,
                    [projectId],
                    (folderError, folderResult) => {
                      if (folderError) {
                        return reject(folderError);
                      }

                      resolve(projectId);
                    }
                  );
                }
              );
            }
          );
        }
      );
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
      // Step 1: Check for an existing project with the same name for the company, excluding the current project
      const checkQuery = `
          SELECT "ProjectId" FROM public."Project"
          WHERE "ProjectName" = $1 
          AND ("CompanyId" = $2 OR ("CompanyId" IS NULL AND $2 IS NULL))
          AND "ProjectId" <> $3;
        `;

      const checkValues = [
        ProjectData.ProjectName,
        ProjectData.CompanyId,
        ProjectData.ProjectId,
      ];

      db.query(checkQuery, checkValues, (checkErr, checkResult) => {
        if (checkErr) {
          return reject(checkErr);
        }

        // If another project with the same name exists for the company, return a 409 error
        if (checkResult.rows.length > 0) {
          const conflictError = new Error(
            "Un progetto con questo nome esiste già per l'azienda specificata."
          );
          conflictError.statusCode = 409; // Conflict
          return reject(conflictError);
        }

        // Step 2: Proceed with the project update if no conflict
        const updateQuery = `
              UPDATE public."Project"
              SET "ProjectName" = $1, "ProjectDescription" = $2, "ProjectCreationDate" = $3, 
                  "ProjectEndDate" = $4, "ProjectManagerId" = $5, "CompanyId" = $6, "StatusId" = $7
              WHERE "ProjectId" = $8;
            `;

        const updateValues = [
          ProjectData.ProjectName,
          ProjectData.ProjectDescription,
          ProjectData.ProjectCreationDate,
          ProjectData.ProjectEndDate,
          ProjectData.ProjectManagerId,
          ProjectData.CompanyId,
          ProjectData.StatusId,
          ProjectData.ProjectId,
        ];

        db.query(updateQuery, updateValues, (updateErr, result) => {
          if (updateErr) {
            reject(updateErr);
          } else {
            resolve(result.rows);
          }
        });
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

  static createProjectConversation(db, ProjectId, ProjectManagerId, CompanyId) {
    return new Promise((resolve, reject) => {
      const query = `INSERT INTO public."Conversation"("ProjectId") VALUES ($1);`;

      db.query(query, [ProjectId], (error, result) => {
        if (error) {
          reject(error);
        } else {
          const query = `INSERT INTO public."Conversation"("Staffer1Id", "ProjectId") VALUES ($1, $2) RETURNING *`;
          db.query(query, [ProjectManagerId, ProjectId], (error, result) => {
            if (error) {
              reject(error);
            } else {
              resolve(result.rows[0]);
            }
          });
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

  static getMessagesCustomerByConversationId(db, ConversationId) {
    return new Promise((resolve, reject) => {
      const query = `SELECT 
            m."MessageId", 
            m."StafferSenderId", 
            m."ConversationId", 
            m."Date", 
            m."Text",
            m."IsCustomer",
            CASE
                WHEN m."IsCustomer" = false THEN CONCAT(s."StafferName", ' ', s."StafferSurname")
                ELSE CONCAT(c."CustomerName", ' ', c."CustomerSurname")
            END AS "SenderFullName",
            CASE
                WHEN m."IsCustomer" = false THEN s."StafferImageUrl"
            END AS "SenderImageUrl"
        FROM 
            public."Message" m
        LEFT JOIN 
            public."Staffer" s 
            ON m."StafferSenderId" = s."StafferId" AND m."IsCustomer" = false
        LEFT JOIN 
            public."Customer" c 
            ON m."StafferSenderId" = c."CustomerId" AND m."IsCustomer" = true
        WHERE 
            m."ConversationId" = $1
        ORDER BY 
            m."Date" ASC;
        `;

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
      const query = `SELECT * FROM public."ProjectTask" WHERE "ProjectId" = $1 AND "IsArchived" = false`;

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

  static getCommentsByTaskId(db, ProjectTaskId) {
    return new Promise((resolve, reject) => {
      const query = `SELECT "ProjectTaskCommentId", "StafferId", "CommentDate", "Text", "StafferImageUrl", CONCAT("StafferName", ' ', "StafferSurname") AS "StafferFullName" FROM public."ProjectTaskComment" 
      INNER JOIN public."Staffer" USING("StafferId")
      WHERE "ProjectTaskId" = $1
      ORDER BY "ProjectTaskCommentId" DESC`;

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

  static updateTask(db, TaskData, FormattedDate, FormattedCreationDate) {
    return new Promise((resolve, reject) => {
      const query = `UPDATE public."ProjectTask" SET "ProjectTaskName" = $1, "ProjectTaskDescription" = $2, "ProjectTaskExpiration" = $3, "ProjectTaskCreation"= $4 WHERE "ProjectTaskId" = $5`;

      const values = [
        TaskData.ProjectTaskName,
        TaskData.ProjectTaskDescription,
        FormattedDate,
        FormattedCreationDate,
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
      const query = `SELECT * FROM public."Project" WHERE "ProjectName" ILIKE '%${ProjectName}%'`;

      db.query(query, (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result.rows);
        }
      });
    });
  }

  static searchProjectByNameTable(db, ProjectName) {
    return new Promise((resolve, reject) => {
      const query = `SELECT "ProjectId", "ProjectName", "ProjectCreationDate", "ProjectEndDate", CONCAT("StafferName",' ',"StafferSurname") AS "ProjectManagerName", 
      "StafferImageUrl", "RoleName", "StatusId", "StatusName", "CompanyId", "CompanyName"
      FROM public."Project" 
      INNER JOIN public."Staffer" s ON "ProjectManagerId" = s."StafferId" 
      INNER JOIN public."StafferRole" USING ("StafferId") 
      INNER JOIN public."Role" USING("RoleId") 
      INNER JOIN public."Status" USING("StatusId")
      LEFT JOIN public."Company" USING("CompanyId") 
      WHERE "ProjectName" ILIKE '%${ProjectName}%'`;

      db.query(query, (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result.rows);
        }
      });
    });
  }

  static getProjectsByCustomerId(db, CustomerId) {
    return new Promise((resolve, reject) => {
      const query = `SELECT "ProjectId","CompanyName", "ProjectName", "ProjectDescription", "ProjectCreationDate", "ProjectEndDate", "StatusId", "StatusName", "UniqueCode" FROM public."Customer"
	    INNER JOIN public."CustomerCompany" USING("CustomerId")
	    LEFT JOIN public."Company" USING("CompanyId")
	    INNER JOIN public."Project" USING("CompanyId")
	    INNER JOIN public."Status" USING("StatusId") 
      WHERE "CustomerId" = $1`;

      db.query(query, [CustomerId], (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result.rows);
        }
      });
    });
  }

  static searchProjectsByCustomerIdAndName(db, CustomerId, ProjectName) {
    return new Promise((resolve, reject) => {
      const query = `SELECT "ProjectId","CompanyName", "ProjectName", "ProjectDescription", "ProjectCreationDate", "ProjectEndDate", "StatusId", "StatusName" FROM public."Customer"
	    INNER JOIN public."CustomerCompany" USING("CustomerId")
	    LEFT JOIN public."Company" USING("CompanyId")
	    INNER JOIN public."Project" USING("CompanyId")
	    INNER JOIN public."Status" USING("StatusId") 
      WHERE "CustomerId" = $1 AND "ProjectName" ILIKE '%${ProjectName}%'`;

      db.query(query, [CustomerId], (error, result) => {
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
      const query = `WITH NotificationCounts AS ( SELECT public."Project"."ProjectId", public."Project"."ProjectName", public."Company"."CompanyImageUrl", public."Company"."CompanyName", public."Project"."UniqueCode", 
      COUNT(CASE WHEN public."NotificationExtraData"."IsRead" = false THEN public."NotificationInfo"."NotificationId" END) AS "NotificationCount",
      bool_or(public."NotificationExtraData"."IsRead" = false) AS "HasUnread"
      FROM public."ProjectTeam" 
      INNER JOIN public."Project" USING("ProjectId") 
      LEFT JOIN public."Company" USING("CompanyId") 
      LEFT JOIN public."NotificationExtraData" ON public."ProjectTeam"."StafferId" = public."NotificationExtraData"."UserId"
      LEFT JOIN public."NotificationInfo" ON public."NotificationExtraData"."NotificationId" = public."NotificationInfo"."NotificationId" 
      AND public."NotificationInfo"."ProjectId" = public."Project"."ProjectId"
      WHERE public."ProjectTeam"."StafferId" = $1 AND public."Project"."StatusId" <> 3
      GROUP BY public."Project"."ProjectId", 
      public."Project"."ProjectName", 
      public."Company"."CompanyImageUrl",
      public."Company"."CompanyName",
      public."Project"."UniqueCode")
      SELECT "ProjectId", "ProjectName", "CompanyImageUrl", "CompanyName", "NotificationCount", "UniqueCode"
      FROM NotificationCounts
      WHERE ("HasUnread" = true OR "NotificationCount" = 0);`;

      db.query(query, [StafferId], (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result.rows);
        }
      });
    });
  }

  static addTask(
    db,
    TaskData,
    FormattedDate,
    FormattedCreationDate,
    ProjectId
  ) {
    return new Promise((resolve, reject) => {
      const query = `INSERT INTO public."ProjectTask"("ProjectTaskName", "ProjectTaskDescription", "ProjectTaskExpiration", "ProjectTaskCreation", "ProjectId")
      VALUES ($1, $2, $3, $4, $5) RETURNING *`;

      const values = [
        TaskData.ProjectTaskName,
        TaskData.ProjectTaskDescription,
        FormattedDate,
        FormattedCreationDate,
        ProjectId,
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

  static async uploadFiles(db, fileData, FolderId) {
    return new Promise((resolve, reject) => {
      const query = `INSERT INTO public."ProjectFiles" ("FolderId", "FileName", "FilePath", "ForClient") VALUES ($1, $2, $3, $4)`;
      const insertPromises = fileData.map(({ fileName, filePath, forClient }) =>
        db.query(
          query,
          [FolderId, fileName, filePath, forClient],
          (error, result) => {
            if (error) {
              reject(error);
            }
          }
        )
      );

      resolve(insertPromises);
    });
  }

  static async uploadTaskFiles(db, fileData, TaskId) {
    return new Promise((resolve, reject) => {
      const query = `INSERT INTO public."ProjectTaskFiles" ("TaskId", "FileName", "FilePath") VALUES ($1, $2, $3)`;
      const insertPromises = fileData.map(({ fileName, filePath }) =>
        db.query(query, [TaskId, fileName, filePath], (error, result) => {
          if (error) {
            reject(error);
          }
        })
      );

      resolve(insertPromises);
    });
  }

  static async removeFile(db, FilePath, FolderId) {
    return new Promise((resolve, reject) => {
      const query = `DELETE FROM public."ProjectFiles" WHERE "FolderId" = $1 AND "FilePath" = $2`;
      const values = [FolderId, FilePath];

      db.query(query, values, (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      });
    });
  }

  static async removeFolder(db, FolderId, ProjectId) {
    return new Promise((resolve, reject) => {
      const query = `DELETE FROM public."ProjectFolder" WHERE "FolderId" = $1 AND "ProjectId" = $2`;
      const values = [FolderId, ProjectId];

      db.query(query, values, (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      });
    });
  }

  static async removeTaskFile(db, FilePath, ProjectId) {
    return new Promise((resolve, reject) => {
      const query = `DELETE FROM public."ProjectTaskFiles" WHERE "TaskId" = $1 AND "FilePath" = $2`;
      const values = [ProjectId, FilePath];

      db.query(query, values, (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      });
    });
  }

  static async getFoldersByUpFolderId(db, UpFolderId) {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM public."ProjectFolder" WHERE "UpFolderId" = $1 AND "FolderName" <> 'Default'`;
      db.query(query, [UpFolderId], (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result.rows);
        }
      });
    });
  }

  static async getFilesByFolderId(db, FolderId) {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM public."ProjectFiles" WHERE "FolderId" = $1`;
      db.query(query, [FolderId], (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result.rows);
        }
      });
    });
  }

  static async getFilesByFolderIdForCustomer(db, FolderId) {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM public."ProjectFiles" 
      INNER JOIN public."ProjectFolder" USING("FolderId")
      WHERE "FolderId" = $1 AND "CustomerVisible" = true`;
      db.query(query, [FolderId], (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result.rows);
        }
      });
    });
  }

  static async getFilesByTaskId(db, TaskId) {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM public."ProjectTaskFiles" WHERE "TaskId" = $1`;
      db.query(query, [TaskId], (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result.rows);
        }
      });
    });
  }

  static async getFoldersByUpFolderIdForCustomer(db, UpFolderId) {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM public."ProjectFolder" WHERE "UpFolderId" = $1 AND "FolderName" <> 'Default' AND "CustomerVisible" = true`;
      db.query(query, [UpFolderId], (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result.rows);
        }
      });
    });
  }

  static async searchFilesByFolderIdAndName(db, FileName, FolderId) {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM public."ProjectFiles" WHERE "FolderId" = $1 AND "FileName" ILIKE '%${FileName}%'`;
      db.query(query, [FolderId], (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result.rows);
        }
      });
    });
  }

  static async searchFolderByProjectIdAndName(db, FolderName, ProjectId) {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM public."ProjectFolder" WHERE "ProjectId" = $1 AND "FolderName" ILIKE '%${FolderName}%'`;
      db.query(query, [ProjectId], (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result.rows);
        }
      });
    });
  }

  static async searchFilesByProjectIdAndNameForCustomer(
    db,
    FileName,
    ProjectId
  ) {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM public."ProjectFiles" WHERE "ForClient" <> false AND "ProjectId" = $1 AND "FileName" ILIKE '%${FileName}%'`;
      db.query(query, [ProjectId], (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result.rows);
        }
      });
    });
  }

  static async addTaskComment(db, Comment, TaskId, StafferId) {
    return new Promise((resolve, reject) => {
      const query = `INSERT INTO public."ProjectTaskComment"("ProjectTaskId", "StafferId", "Text") VALUES ($1, $2, $3) RETURNING *`;
      db.query(query, [TaskId, StafferId, Comment], (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result.rows[0]);
        }
      });
    });
  }

  static async deleteTaskComment(db, CommentId) {
    return new Promise((resolve, reject) => {
      const query = `DELETE FROM public."ProjectTaskComment" WHERE "ProjectTaskCommentId" = $1`;
      db.query(query, [CommentId], (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      });
    });
  }

  static async addTaskCheckbox(db, CheckboxText, ChecklistId) {
    return new Promise((resolve, reject) => {
      const query = `INSERT INTO public."ProjectTaskCheckbox"("ChecklistId", "Text") VALUES ($1, $2) RETURNING *`;
      db.query(query, [ChecklistId, CheckboxText], (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result.rows[0]);
        }
      });
    });
  }

  static async getCheckboxesByChecklistId(db, ChecklistId) {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM public."ProjectTaskCheckbox" WHERE "ChecklistId" = $1 ORDER BY "CheckboxId" ASC`;
      db.query(query, [ChecklistId], (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result.rows);
        }
      });
    });
  }

  static async updateCheckboxStatus(db, CheckboxId, isSelected) {
    return new Promise((resolve, reject) => {
      const query = `UPDATE public."ProjectTaskCheckbox" SET "IsSelected" = $1 WHERE "CheckboxId" = $2`;
      db.query(query, [isSelected, CheckboxId], (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      });
    });
  }

  static async getChecklistsByTaskId(db, TaskId) {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM public."ProjectTaskChecklist" WHERE "ProjectTaskId" = $1`;
      db.query(query, [TaskId], (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result.rows);
        }
      });
    });
  }

  static async addTaskChecklist(db, ChecklistText, TaskId) {
    return new Promise((resolve, reject) => {
      const query = `INSERT INTO public."ProjectTaskChecklist"("ProjectTaskId", "Text") VALUES ($1, $2) RETURNING *`;
      db.query(query, [TaskId, ChecklistText], (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result.rows[0]);
        }
      });
    });
  }

  static async deleteTaskChecklist(db, ChecklistId) {
    return new Promise((resolve, reject) => {
      const query = `DELETE FROM public."ProjectTaskChecklist" WHERE "ChecklistId" = $1`;
      db.query(query, [ChecklistId], (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      });
    });
  }

  static async deleteTaskCheckbox(db, CheckboxId) {
    return new Promise((resolve, reject) => {
      const query = `DELETE FROM public."ProjectTaskCheckbox" WHERE "CheckboxId" = $1`;
      db.query(query, [CheckboxId], (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      });
    });
  }

  static async updateCheckboxText(db, CheckboxId, CheckboxText) {
    return new Promise((resolve, reject) => {
      const query = `UPDATE public."ProjectTaskCheckbox" SET "Text" = $1 WHERE "CheckboxId" = $2`;
      db.query(query, [CheckboxText, CheckboxId], (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      });
    });
  }

  static async updateComment(db, CommentId, CommentText) {
    return new Promise((resolve, reject) => {
      const query = `UPDATE public."ProjectTaskComment" SET "Text" = $1 WHERE "ProjectTaskCommentId" = $2`;
      db.query(query, [CommentText, CommentId], (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      });
    });
  }

  static async addFolder(db, ProjectId, FolderName, UpFolderId) {
    return new Promise((resolve, reject) => {
      const query = `INSERT INTO public."ProjectFolder"("ProjectId", "FolderName", "CustomerVisible", "TeamVisible", "UpFolderId") VALUES ($1, $2, false, false, $3) RETURNING *`;
      db.query(query, [ProjectId, FolderName, UpFolderId], (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result.rows[0]);
        }
      });
    });
  }

  static async getFolderInfoByFolderId(db, FolderId) {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM public."ProjectFolder" WHERE "FolderId" = $1`;
      db.query(query, [FolderId], (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result.rows[0]);
        }
      });
    });
  }

  static async updateFolder(db, FolderId, FolderName, ForClient, ForTeam) {
    return new Promise((resolve, reject) => {
      const query = `UPDATE public."ProjectFolder" SET "FolderName" = $1, "CustomerVisible" = $2, "TeamVisible" = $3 WHERE "FolderId" = $4`;
      db.query(
        query,
        [FolderName, ForClient, ForTeam, FolderId],
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        }
      );
    });
  }

  static async getDefaultProjectFolder(db, ProjectId) {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM public."ProjectFolder" WHERE "ProjectId" = $1 AND "FolderName" = 'Default'`;
      db.query(query, [ProjectId], (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result.rows[0]);
        }
      });
    });
  }

  static async getDefaultFilesByFolderId(db, FolderId) {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM public."ProjectFiles" WHERE "FolderId" = $1`;
      db.query(query, [FolderId], (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result.rows);
        }
      });
    });
  }

  static async getFolderByFolderId(db, FolderId) {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM public."ProjectFolder" WHERE "FolderId" = $1`;
      db.query(query, [FolderId], (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result.rows[0]);
        }
      });
    });
  }

  static async getProjectByUniqueCode(db, UniqueCode) {
    return new Promise((resolve, reject) => {
      const query = `SELECT "ProjectId", "ProjectName", "ProjectDescription", "ProjectCreationDate", "ProjectEndDate", "CompanyId", "ProjectBannerId", "ProjectBannerPath", 
      "StatusName", "ProjectManagerId", "StafferImageUrl", CONCAT("StafferName", ' ', "StafferSurname") AS "ProjectManagerFullName", "StafferEmail" AS "ProjectManagerEmail", "RoleName" FROM public."Project" 
      INNER JOIN public."ProjectBanner" USING("ProjectBannerId")
		  INNER JOIN public."Status" USING("StatusId")
			INNER JOIN public."Staffer" ON "ProjectManagerId" = "StafferId"
      INNER JOIN public."StafferRole" USING("StafferId")
      INNER JOIN public."Role" USING("RoleId")
      WHERE "UniqueCode" = $1`;
      db.query(query, [UniqueCode], (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result.rows[0]);
        }
      });
    });
  }

  static async renameFile(db, FileId, newFileName) {
    return new Promise((resolve, reject) => {
      const query = `UPDATE public."ProjectFiles" SET "FileName" = $1 WHERE "ProjectFileId" = $2`;
      db.query(query, [newFileName, FileId], (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      });
    });
  }
  static async refineText(taskText) {
    const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

    try {
      const response = await fetch(
        "https://api.openai.com/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${OPENAI_API_KEY}`,
          },
          body: JSON.stringify({
            model: "gpt-4", // Correct model name, GPT-4
            messages: [
              {
                role: "system",
                content:
                  "You are a helpful assistant specialized in refining and formatting task descriptions.",
              },
              {
                role: "user",
                content: `Riscrivi il testo seguente in modo più chiaro e formale solo se necessario. Mantieni un linguaggio professionale e preciso, senza aggiungere dettagli superflui. Se il testo è particolarmente lungo, **obbligatoriamente** riorganizzalo utilizzando titoli (<h2>, <h3>) ed elenchi puntati o numerati (<ul>, <ol>) per migliorarne la leggibilità. Se il testo è già chiaro e conciso, limitati a migliorarne la scorrevolezza senza modificarne la struttura. Assicurati di usare "le task" e non "i task". Mantieni il testo sintetico e ben strutturato: ${taskText}`,
              },
            ],
            max_tokens: 500, // Aumentato il numero di token per permettere una descrizione più dettagliata
            temperature: 0.5, // Abbassato il valore per una risposta più focalizzata e meno creativa
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || "Errore sconosciuto");
      }

      const data = await response.json();
      return data.choices[0].message.content.trim();
    } catch (error) {
      console.error("Errore durante la chiamata a OpenAI:", error);
      throw new Error(
        error.message ||
          "Errore sconosciuto durante la comunicazione con OpenAI"
      );
    }
  }

  static async refineProjectDescription(projectDescription) {
    const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

    try {
      const response = await fetch(
        "https://api.openai.com/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${OPENAI_API_KEY}`,
          },
          body: JSON.stringify({
            model: "gpt-4",
            messages: [
              {
                role: "system",
                content:
                  "Sei un assistente che migliora le descrizioni di progetto, rendendole più chiare e professionali. Rispondi esclusivamente con la descrizione migliorata, senza alcun testo aggiuntivo. Caratteri massimi: 250",
              },
              {
                role: "user",
                content: `Riscrivi il seguente testo in modo chiaro e professionale, mantenendo tutte le informazioni essenziali. La descrizione deve essere sintetica ma completa, evitando dettagli superflui. Mantieni uno stile formale e scorrevole, senza modificare il significato del contenuto. Rispondi solo con la descrizione migliorata e nient'altro. Testo da migliorare: ${projectDescription}`,
              },
            ],
            max_tokens: 250,
            temperature: 0.5,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || "Errore sconosciuto");
      }

      const data = await response.json();
      return data.choices[0].message.content.trim();
    } catch (error) {
      console.error("Errore durante la chiamata a OpenAI:", error);
      throw new Error(
        error.message ||
          "Errore sconosciuto durante la comunicazione con OpenAI"
      );
    }
  }

  static async refineRoleDescription(roleDescription) {
    const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

    try {
      const response = await fetch(
        "https://api.openai.com/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${OPENAI_API_KEY}`,
          },
          body: JSON.stringify({
            model: "gpt-4",
            messages: [
              {
                role: "system",
                content:
                  "Sei un assistente esperto nella redazione di descrizioni professionali di ruoli. Riscrivi il seguente testo in modo sintetico, chiaro e formale, mantenendo tutte le informazioni essenziali e migliorandone la fluidità. Evita ripetizioni, dettagli superflui o modifiche di significato. Rispondi esclusivamente con la descrizione migliorata, senza alcun testo aggiuntivo. Caratteri massimi: 250",
              },
              {
                role: "user",
                content: `Testo da migliorare: ${roleDescription}, caratteri massimi: 250`,
              },
            ],
            max_tokens: 250,
            temperature: 0.5,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || "Errore sconosciuto");
      }

      const data = await response.json();
      return data.choices[0].message.content.trim();
    } catch (error) {
      console.error("Errore durante la chiamata a OpenAI:", error);
      throw new Error(
        error.message ||
          "Errore sconosciuto durante la comunicazione con OpenAI"
      );
    }
  }

  static async generateRoleDescription(roleName) {
    const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

    try {
      const response = await fetch(
        "https://api.openai.com/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${OPENAI_API_KEY}`,
          },
          body: JSON.stringify({
            model: "gpt-4",
            messages: [
              {
                role: "system",
                content:
                  "Sei un assistente esperto nella redazione di descrizioni professionali di ruoli. Genera una descrizione sintetica, chiara e formale per il ruolo specificato, mantenendo tutte le informazioni essenziali e migliorandone la fluidità. Evita ripetizioni, dettagli superflui o modifiche di significato. Rispondi esclusivamente con la descrizione migliorata, senza alcun testo aggiuntivo. Sii sintetico al massimo. Descrizione corta massimo 250 caratteri",
              },
              {
                role: "user",
                content: `Genera una descrizione per il ruolo: ${roleName}`,
              },
            ],
            max_tokens: 250,
            temperature: 0.5,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || "Errore sconosciuto");
      }

      const data = await response.json();
      return data.choices[0].message.content.trim();
    } catch (error) {
      console.error("Errore durante la chiamata a OpenAI:", error);
      throw new Error(
        error.message ||
          "Errore sconosciuto durante la comunicazione con OpenAI"
      );
    }
  }
  static async getTicketTaskStatusChangeMailData(db, TaskId) {
    return new Promise((resolve, reject) => {
      const query = `SELECT "ProjectTaskStatusName", "CompanyName", "CompanyEmail", "ProjectTicketTitle" FROM public."ProjectTask"
      INNER JOIN public."ProjectTaskStatus" USING("ProjectTaskStatusId")
      INNER JOIN public."Project" USING("ProjectId")
      INNER JOIN public."Company" USING("CompanyId")
      INNER JOIN public."ProjectTicket" USING("ProjectTaskId")
      WHERE "ProjectTaskId" = $1`;

      db.query(query, [TaskId], (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result.rows[0]);
        }
      });
    });
  }

  static async getCodeShareTabs(db, ProjectId) {
    return new Promise((resolve, reject) => {
      const query = `SELECT "ProjectCodeShareId", "ProjectCodeShareName", "ImageURL", "Code" FROM public."ProjectCodeShare" WHERE "ProjectId" = $1`;
      db.query(query, [ProjectId], (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result.rows);
        }
      });
    });
  }

  static async addCodeShareTab(db, ProjectId, TabName) {
    return new Promise((resolve, reject) => {
      const query = `INSERT INTO public."ProjectCodeShare"("ProjectId", "ProjectCodeShareName", "Code") VALUES ($1, $2, '// Insert code here')`;
      db.query(query, [ProjectId, TabName], (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result.rows[0]);
        }
      });
    });
  }

  static async updateProjectCode(db, ProjectCodeShareId, Code) {
    return new Promise((resolve, reject) => {
      const query = `UPDATE public."ProjectCodeShare" SET "Code" = $1 WHERE "ProjectCodeShareId" = $2`;
      db.query(query, [Code, ProjectCodeShareId], (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      });
    });
  }

  static async getCodeShareCode(db, ProjectCodeShareId) {
    return new Promise((resolve, reject) => {
      const query = `SELECT "Code" FROM public."ProjectCodeShare" WHERE "ProjectCodeShareId" = $1`;
      db.query(query, [ProjectCodeShareId], (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result.rows[0]);
        }
      });
    });
  }

  static async uploadCodeShareScreenshot(db, ProjectCodeShareId, filePath) {
    return new Promise((resolve, reject) => {
      const query = `UPDATE public."ProjectCodeShare" SET "ImageURL" = $1 WHERE "ProjectCodeShareId" = $2`;
      db.query(query, [filePath, ProjectCodeShareId], (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      });
    });
  }

  static async deleteCodeShareTab(db, ProjectCodeShareId) {
    return new Promise((resolve, reject) => {
      const query = `DELETE FROM public."ProjectCodeShare" WHERE "ProjectCodeShareId" = $1`;
      db.query(query, [ProjectCodeShareId], (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      });
    });
  }

  static async getOldFilePath(db, ProjectCodeShareId) {
    return new Promise((resolve, reject) => {
      const query = `SELECT "ImageURL" FROM public."ProjectCodeShare" WHERE "ProjectCodeShareId" = $1`;
      db.query(query, [ProjectCodeShareId], (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result.rows.length > 0 ? result.rows[0].ImageURL : null);
        }
      });
    });
  }

  static async archiveTask(db, TaskId) {
    return new Promise((resolve, reject) => {
      const query = `UPDATE public."ProjectTask" SET "IsArchived" = true WHERE "ProjectTaskId" = $1`;
      db.query(query, [TaskId], (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      });
    });
  }

  static async getArchivedTasksByProjectId(db, ProjectId) {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM public."ProjectTask" WHERE "ProjectId" = $1 AND "IsArchived" = true`;
      db.query(query, [ProjectId], (error, result) => {
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
