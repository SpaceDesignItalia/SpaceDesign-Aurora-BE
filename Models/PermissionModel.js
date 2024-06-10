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

  static async getAllRoles(db) {
    return new Promise((resolve, reject) => {
      const query = `SELECT "RoleId","RoleName","RoleDescription" FROM public."Role"`;

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
      const query = `SELECT "RoleId", "RoleName", "RoleDescription" FROM "Role" ORDER BY "RoleId"`;

      db.query(query, (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result.rows);
        }
      });
    });
  }

  static async getRoleById(db, RoleId) {
    return new Promise((resolve, reject) => {
      const query = `
        SELECT 
          r."RoleId", 
          r."RoleName", 
          r."RoleDescription", 
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

  static async addRole(db, RoleData, RolePermissionData) {
    return new Promise((resolve, reject) => {
      const insertRoleQuery = `
        INSERT INTO public."Role" ("RoleName", "RoleDescription")
        VALUES ($1, $2)
        RETURNING "RoleId";
      `;

      const roleValues = [RoleData.RoleName, RoleData.RoleDescription];

      db.query(insertRoleQuery, roleValues, (roleError, roleResult) => {
        if (roleError) {
          return reject(roleError);
        }

        const newRoleId = roleResult.rows[0].RoleId;

        // Prepara le query di inserimento per RolePermission
        const insertRolePermissionQuery = `
          INSERT INTO public."RolePermission" ("RoleId", "PermissionId")
          VALUES ($1, $2);
        `;

        const rolePermissionPromises = RolePermissionData.map((permission) => {
          return new Promise((resolve, reject) => {
            db.query(
              insertRolePermissionQuery,
              [newRoleId, permission.PermissionId],
              (permissionError) => {
                if (permissionError) {
                  return reject(permissionError);
                }
                resolve();
              }
            );
          });
        });

        // Esegui tutte le query di inserimento per RolePermission
        Promise.all(rolePermissionPromises)
          .then(() => {
            resolve({ RoleId: newRoleId });
          })
          .catch((permissionError) => {
            reject(permissionError);
          });
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

  static async updateRole(db, RoleId, RoleData, RolePermissionData) {
    return new Promise((resolve, reject) => {
      // Inizio della transazione
      db.query("BEGIN", (beginError) => {
        if (beginError) {
          return reject(beginError);
        }

        // Aggiorna i dati del ruolo nella tabella Role
        const updateRoleQuery = `
          UPDATE public."Role"
          SET "RoleName" = $1, "RoleDescription" = $2
          WHERE "RoleId" = $3;
        `;

        const roleValues = [
          RoleData.RoleName,
          RoleData.RoleDescription,
          RoleId,
        ];

        db.query(updateRoleQuery, roleValues, (updateError) => {
          if (updateError) {
            return db.query("ROLLBACK", () => {
              reject(updateError);
            });
          }

          // Rimuovi i permessi esistenti nella tabella RolePermission
          const deleteRolePermissionQuery = `
            DELETE FROM public."RolePermission"
            WHERE "RoleId" = $1;
          `;

          db.query(deleteRolePermissionQuery, [RoleId], (deleteError) => {
            if (deleteError) {
              return db.query("ROLLBACK", () => {
                reject(deleteError);
              });
            }

            // Prepara le query di inserimento per i nuovi permessi
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

            // Esegui tutte le query di inserimento per i nuovi permessi
            Promise.all(rolePermissionPromises)
              .then(() => {
                // Commit della transazione se tutte le query hanno avuto successo
                db.query("COMMIT", (commitError) => {
                  if (commitError) {
                    return reject(commitError);
                  }
                  resolve({ RoleId });
                });
              })
              .catch((permissionError) => {
                // Rollback della transazione in caso di errore
                db.query("ROLLBACK", () => {
                  reject(permissionError);
                });
              });
          });
        });
      });
    });
  }
}

module.exports = PermissionModel;
