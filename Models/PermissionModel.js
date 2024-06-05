class PermissionModel {
  static async getAllPermissionsGroups(db) {
    return new Promise((resolve, reject) => {
      const query = `SELECT "GroupName" FROM public."Group"`;

      db.query(query, (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result.rows);
        }
      });
    });
  }

  static async getAllPermissions(db) {
    return new Promise((resolve, reject) => {
      const query = `SELECT "PermissionId","PermissionName","GroupName" FROM public."Permission"
      INNER JOIN "PermissionGroup" USING("PermissionId")
      INNER JOIN "Group" USING("PermissionGroupId") ORDER BY "PermissionGroupId"`;

      db.query(query, (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result.rows);
        }
      });
    });
  }

  static async addRole(db, RoleData, RolePermissionData) {
    return new Promise((resolve, reject) => {
      const query = `SELECT "PermissionId","PermissionName","GroupName" FROM public."Permission"
      INNER JOIN "PermissionGroup" USING("PermissionId")
      INNER JOIN "Group" USING("PermissionGroupId") ORDER BY "PermissionGroupId"`;

      db.query(query, (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result.rows);
        }
      });
    });
  }
}

module.exports = PermissionModel;
