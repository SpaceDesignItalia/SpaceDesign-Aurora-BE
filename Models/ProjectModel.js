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
      "StatusName", "ProjectManagerId", CONCAT("StafferName", ' ', "StafferSurname") AS "ProjectManagerFullName", "StafferEmail" AS "ProjectManagerEmail", "RoleName" FROM public."Project" 
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
      const query = `SELECT "StafferId", CONCAT("StafferName", ' ', "StafferSurname") AS "StafferFullName", "StafferEmail" FROM public."ProjectTeam" INNER JOIN public."Staffer" USING("StafferId") WHERE "ProjectId" = $1`;

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
      const query = `SELECT "StafferId", CONCAT("StafferName",' ',"StafferSurname") AS "StafferFullName", "StafferEmail", "RoleName" FROM public."Staffer" 
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
          resolve(result.rows);
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
}

module.exports = ProjectModel;
