class PermissionModel {
  static async getAllPermissionsGroups(db) {
    return new Promise((resolve, reject) => {
      const query = `SELECT "PermissionGroupId", "GroupName" FROM public."Group"`;

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
      const query = `SELECT "PermissionId","PermissionName", "PermissionDescription","GroupName" FROM public."Permission"
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

  static async getAllRoles(db) {
    return new Promise((resolve, reject) => {
      const query = `SELECT "RoleId","RoleName","RoleDescription", "RolePriority" FROM public."Role"`;

      db.query(query, (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result.rows);
        }
      });
    });
  }

  static async getPermissionsByUserRole(db, StafferId) {
    return new Promise((resolve, reject) => {
      const query = `SELECT "PermissionAction" FROM public."Permission"
      INNER JOIN "RolePermission" USING("PermissionId")
      INNER JOIN "Role" USING("RoleId")
      INNER JOIN "StafferRole" USING("RoleId")
      INNER JOIN "Staffer" USING("StafferId")
      WHERE "StafferId" = $1`;

      db.query(query, [StafferId], (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result.rows);
        }
      });
    });
  }

  static async addPermission(db, PermissionData) {
    try {
      // Check if the permission already exists and get its ID if it does
      const getPermissionIdQuery = `SELECT "PermissionId" FROM "Permission" WHERE "PermissionName" = $1`;
      const permissionResult = await db.query(getPermissionIdQuery, [
        PermissionData.PermissionName,
      ]);

      let permissionId;
      if (permissionResult.rows.length > 0) {
        // Permission exists, get its ID
        permissionId = permissionResult.rows[0].PermissionId;
      } else {
        // Permission does not exist, insert a new permission
        const insertPermissionQuery = `INSERT INTO "Permission" ("PermissionName", "PermissionDescription", "PermissionAction") VALUES ($1, $2, $3) RETURNING "PermissionId"`;
        const insertPermissionValues = [
          PermissionData.PermissionName,
          PermissionData.PermissionDescription,
          PermissionData.PermissionAction,
        ];
        const insertPermissionResult = await db.query(
          insertPermissionQuery,
          insertPermissionValues
        );
        permissionId = insertPermissionResult.rows[0].PermissionId;
      }

      // Insert into PermissionGroup using the permissionId
      const insertPermissionGroupQuery = `INSERT INTO "PermissionGroup" ("PermissionId", "PermissionGroupId") VALUES ($1, $2) RETURNING "PermissionId"`;
      const insertPermissionGroupValues = [
        permissionId,
        PermissionData.PermissionGroupId,
      ];
      const insertPermissionGroupResult = await db.query(
        insertPermissionGroupQuery,
        insertPermissionGroupValues
      );

      return insertPermissionGroupResult.rows;
    } catch (error) {
      throw error;
    }
  }

  static async getRoleById(db, RoleId) {
    return new Promise((resolve, reject) => {
      const query = `
        SELECT 
          r."RoleId", 
          r."RoleName", 
          r."RoleDescription", 
          r."RolePriority",
          json_agg(json_build_object('PermissionId', p."PermissionId", 'PermissionName', p."PermissionName")) AS permissions
        FROM 
          "Role" r
        LEFT JOIN 
          "RolePermission" rp ON r."RoleId" = rp."RoleId"
        LEFT JOIN 
          "Permission" p ON rp."PermissionId" = p."PermissionId"
        WHERE 
          r."RoleId" = $1
        GROUP BY 
          r."RoleId";
      `;
      const values = [RoleId];
      db.query(query, values, (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result.rows[0]); // Restituisce solo il primo risultato poiché RoleId è unico
        }
      });
    });
  }

  static async getPermissionById(db, PermissionId) {
    return new Promise((resolve, reject) => {
      const query = `
        SELECT 
          p."PermissionId", 
          p."PermissionName", 
          p."PermissionDescription", 
          p."PermissionAction", 
          pg."PermissionGroupId", 
          g."GroupName"
        FROM 
          "Permission" p
        LEFT JOIN 
          "PermissionGroup" pg ON p."PermissionId" = pg."PermissionId"
        LEFT JOIN 
          "Group" g ON pg."PermissionGroupId" = g."PermissionGroupId"
        WHERE 
          p."PermissionId" = $1;
      `;
      const values = [PermissionId];
      db.query(query, values, (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result.rows);
        }
      });
    });
  }

  static async searchRoleByName(db, RoleName) {
    return new Promise((resolve, reject) => {
      const query = `SELECT "RoleId", "RoleName", "RoleDescription" FROM "Role" WHERE "RoleName" LIKE '%${RoleName}%' ORDER BY "RoleId"`;
      db.query(query, (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result.rows);
        }
      });
    });
  }

  static async searchPermissionByName(db, PermissionName) {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM public."Permission" WHERE "PermissionName" LIKE '%${PermissionName}%'`;
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
      // Check for existing role with the same name
      const checkRoleQuery = `
        SELECT "RoleId" FROM public."Role" WHERE "RoleName" = $1;
      `;

      db.query(
        checkRoleQuery,
        [RoleData.RoleName],
        (checkError, checkResult) => {
          if (checkError) {
            return reject({
              message: "Errore nel controllo del ruolo esistente.",
              error: checkError,
            });
          }

          // If a role with the same name exists, reject the promise
          if (checkResult.rows.length > 0) {
            return reject({ message: "Un ruolo con questo nome esiste già." });
          }

          // Insert the new role
          const insertRoleQuery = `
          INSERT INTO public."Role" ("RoleName", "RoleDescription", "RolePriority")
          VALUES ($1, $2, $3)
          RETURNING "RoleId";
        `;

          const roleValues = [
            RoleData.RoleName,
            RoleData.RoleDescription,
            RoleData.RolePriority,
          ];

          db.query(insertRoleQuery, roleValues, (roleError, roleResult) => {
            if (roleError) {
              return reject({
                message: "Errore durante l'inserimento del ruolo.",
                error: roleError,
              });
            }

            const newRoleId = roleResult.rows[0].RoleId;

            // Insert role permissions
            const insertRolePermissionQuery = `
            INSERT INTO public."RolePermission" ("RoleId", "PermissionId")
            VALUES ($1, $2);
          `;

            const rolePermissionPromises = RolePermissionData.map(
              (permission) => {
                return new Promise((resolve, reject) => {
                  db.query(
                    insertRolePermissionQuery,
                    [newRoleId, permission.PermissionId],
                    (permissionError) => {
                      if (permissionError) {
                        return reject({
                          message: "Errore durante l'inserimento dei permessi.",
                          error: permissionError,
                        });
                      }
                      resolve();
                    }
                  );
                });
              }
            );

            Promise.all(rolePermissionPromises)
              .then(() => {
                resolve({ RoleId: newRoleId });
              })
              .catch((permissionError) => {
                reject({
                  message: "Errore durante l'inserimento dei permessi.",
                  error: permissionError,
                });
              });
          });
        }
      );
    });
  }

  static async updateRole(db, RoleId, RoleData, RolePermissionData) {
    return new Promise((resolve, reject) => {
      // Step 1: Check if the new role name already exists (excluding the current RoleId)
      const checkRoleNameQuery = `
            SELECT "RoleId"
            FROM public."Role"
            WHERE "RoleName" = $1 AND "RoleId" != $2;
        `;

      db.query(
        checkRoleNameQuery,
        [RoleData.RoleName, RoleId],
        (checkError, checkResult) => {
          if (checkError) {
            return reject(checkError);
          } else if (checkResult.rows.length > 0) {
            // Role name already in use by another role
            const error = new Error(
              "Conflict: Another role with the same name exists."
            );
            error.statusCode = 409; // Conflict
            return reject(error);
          } else {
            // Step 2: Proceed with the update if no duplicate role name
            const updateRoleQuery = `
                    UPDATE public."Role"
                    SET "RoleName" = $1, "RoleDescription" = $2, "RolePriority" = $3
                    WHERE "RoleId" = $4;
                `;
            const roleValues = [
              RoleData.RoleName,
              RoleData.RoleDescription,
              RoleData.RolePriority,
              RoleId,
            ];

            db.query(
              updateRoleQuery,
              roleValues,
              (updateError, updateResult) => {
                if (updateError) {
                  return reject(updateError);
                }

                // Step 3: Delete existing role permissions
                const deleteRolePermissionsQuery = `
                        DELETE FROM public."RolePermission"
                        WHERE "RoleId" = $1;
                    `;

                db.query(
                  deleteRolePermissionsQuery,
                  [RoleId],
                  (deleteError) => {
                    if (deleteError) {
                      return reject(deleteError);
                    }

                    // Step 4: Insert new role permissions
                    const insertRolePermissionQuery = `
                            INSERT INTO public."RolePermission" ("RoleId", "PermissionId")
                            VALUES ($1, $2);
                        `;

                    const rolePermissionPromises = RolePermissionData.map(
                      (permission) => {
                        return new Promise((resolve, reject) => {
                          db.query(
                            insertRolePermissionQuery,
                            [RoleId, permission.PermissionId],
                            (permissionError) => {
                              if (permissionError) {
                                return reject(permissionError);
                              }
                              resolve();
                            }
                          );
                        });
                      }
                    );

                    Promise.all(rolePermissionPromises)
                      .then(() => {
                        resolve({ RoleId: RoleId });
                      })
                      .catch((permissionError) => {
                        reject(permissionError);
                      });
                  }
                );
              }
            );
          }
        }
      );
    });
  }

  static async updatePermission(db, PermissionData) {
    return new Promise((resolve, reject) => {
      const query = `UPDATE public."Permission" SET "PermissionName" = $1, "PermissionDescription" = $2, "PermissionAction" = $3 WHERE "PermissionId" = $4`;

      const values = [
        PermissionData.PermissionName,
        PermissionData.PermissionDescription,
        PermissionData.PermissionAction,
        PermissionData.PermissionId,
      ];
      db.query(query, values, (error, result) => {
        if (error) {
          reject(error);
        } else {
          const query = `UPDATE public."PermissionGroup" SET "PermissionGroupId" = $1 WHERE "PermissionId" = $2`;
          db.query(
            query,
            [PermissionData.PermissionGroupId, PermissionData.PermissionId],
            (error, result) => {
              if (error) {
                reject(error);
              } else {
                resolve(result.rows);
              }
            }
          );
        }
      });
    });
  }

  static async deleteRole(db, RoleId) {
    return new Promise((resolve, reject) => {
      const query = `DELETE FROM public."Role" WHERE "RoleId" = $1`;
      const values = [RoleId];
      db.query(query, values, (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result.rows);
        }
      });
    });
  }

  static async deletePermission(db, PermissionId) {
    return new Promise((resolve, reject) => {
      const query = `DELETE FROM public."Permission" WHERE "PermissionId" = $1`;
      const values = [PermissionId];
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

module.exports = PermissionModel;
