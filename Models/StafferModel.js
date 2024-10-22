const bcrypt = require("bcrypt");

class StafferModel {
  static getAllStaffers(db) {
    return new Promise((resolve, reject) => {
      const query = `
        SELECT 
          s."StafferId" AS "EmployeeId", 
          CONCAT(s."StafferName", ' ', s."StafferSurname") AS "EmployeeFullName", 
          s."StafferEmail" AS "EmployeeEmail", 
          s."StafferPhone" AS "EmployeePhone", 
          s."CreationTime" AS "EmployeeCreationTime",
          r."RoleName" AS "RoleName"
        FROM 
          public."Staffer" s
        LEFT JOIN 
          public."StafferRole" sr ON s."StafferId" = sr."StafferId"
        LEFT JOIN 
          public."Role" r ON sr."RoleId" = r."RoleId"`;

      db.query(query, (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result.rows);
        }
      });
    });
  }

  static getNewStaffers(db) {
    return new Promise((resolve, reject) => {
      const query = `
        SELECT 
          s."StafferId" AS "EmployeeId", 
          CONCAT(s."StafferName", ' ', s."StafferSurname") AS "EmployeeFullName", 
          s."StafferEmail" AS "EmployeeEmail", 
          s."StafferPhone" AS "EmployeePhone", 
          s."CreationTime" AS "EmployeeCreationTime",
          r."RoleName" AS "RoleName"
        FROM 
          public."Staffer" s
        LEFT JOIN 
          public."StafferRole" sr ON s."StafferId" = sr."StafferId"
        LEFT JOIN 
          public."Role" r ON sr."RoleId" = r."RoleId"
        WHERE 
          s."CreationTime" >= NOW() - INTERVAL '1 MONTH'`;

      db.query(query, (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result.rows);
        }
      });
    });
  }

  static getStafferById(db, StafferId) {
    return new Promise((resolve, reject) => {
      const query = `SELECT "StafferId" AS "EmployeeId", "StafferName" AS "EmployeeName", "StafferSurname" AS "EmployeeSurname", 
      "StafferEmail" AS "EmployeeEmail", "StafferPhone" AS "EmployeePhone" FROM public."Staffer" WHERE "StafferId" = $1`;

      db.query(query, [StafferId], (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result.rows);
        }
      });
    });
  }

  static getStafferRoleById(db, EmployeeId) {
    return new Promise((resolve, reject) => {
      const query = `SELECT "RoleId" FROM public."Staffer"
      INNER JOIN public."StafferRole" USING("StafferId")
      WHERE "StafferId" = $1`;

      const query1 = `SELECT * FROM public."Role" WHERE "RoleId" = $1`;

      db.query(query, [EmployeeId], (error, result) => {
        if (error) {
          reject(error);
        } else {
          for (let i = 0; i < result.rows.length; i++) {
            db.query(query1, [result.rows[i].RoleId], (error, result) => {
              if (error) {
                reject(error);
              } else {
                resolve(result.rows);
              }
            });
          }
        }
      });
    });
  }

  static searchStafferByEmail(db, EmployeeEmail) {
    return new Promise((resolve, reject) => {
      const query = `SELECT "StafferId" AS "EmployeeId", CONCAT("StafferName", ' ', "StafferSurname") "EmployeeFullName", "StafferEmail" AS "EmployeeEmail", 
      "StafferPhone" AS "EmployeePhone" FROM public."Staffer" 
      WHERE "StafferEmail" LIKE '%${EmployeeEmail}%'`;

      db.query(query, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result.rows);
        }
      });
    });
  }

  static addNewStaffer(db, newStafferData, selectedRole) {
    return new Promise((resolve, reject) => {
      const query = `INSERT INTO public."Staffer"("StafferName", "StafferSurname", "StafferEmail", "StafferPhone", "StafferPassword")
            VALUES ($1, $2, $3, $4, $5) RETURNING *`;

      const values = [
        newStafferData.EmployeeName,
        newStafferData.EmployeeSurname,
        newStafferData.EmployeeEmail,
        newStafferData.EmployeePhone,
      ];

      bcrypt.hash(
        newStafferData.EmployeePassword,
        10,
        (hashError, hashedPassword) => {
          if (hashError) {
            console.error(
              "Errore durante l'hashing della password:",
              hashError
            );
          }
          values.push(hashedPassword);

          db.query(query, values, (error, result) => {
            if (error) {
              reject(error);
            } else {
              const StafferId = result.rows[0].StafferId;

              const query = `INSERT INTO public."StafferRole"("StafferId", "RoleId")
                VALUES ($1, $2)`;
              db.query(
                query,
                [StafferId, selectedRole.RoleId],
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
        }
      );
    });
  }

  static updateStaffer(db, newEmployeeData, selectedRole) {
    return new Promise((resolve, reject) => {
      const query = `UPDATE public."Staffer" SET "StafferName"= $1, "StafferSurname"= $2, "StafferEmail"= $3, "StafferPhone"= $4
            WHERE "StafferId"= $5`;

      const values = [
        newEmployeeData.EmployeeName,
        newEmployeeData.EmployeeSurname,
        newEmployeeData.EmployeeEmail,
        newEmployeeData.EmployeePhone,
        newEmployeeData.EmployeeId,
      ];
      db.query(query, values, (error, result) => {
        if (error) {
          reject(error);
        } else {
          const query = `SELECT "RoleId" FROM public."StafferRole" WHERE "StafferId" = $1`;
          db.query(query, [newEmployeeData.EmployeeId], (error, result) => {
            if (error) {
              reject(error);
            } else {
              if (result !== selectedRole) {
                const query = `UPDATE public."StafferRole" SET "RoleId"= $1
                WHERE "StafferId"= $2`;
                const values = [selectedRole, newEmployeeData.EmployeeId];
                db.query(query, values, (error, result) => {
                  if (error) {
                    reject(error);
                  } else {
                    resolve(result.affectedRows);
                  }
                });
              } else {
                resolve(result.affectedRows);
              }
            }
          });
        }
      });
    });
  }

  static settingsUpdateStaffer(db, newEmployeeData, newProfilePic) {
    return new Promise((resolve, reject) => {
      const query = `UPDATE public."Staffer" SET "StafferName" = $1, "StafferSurname" = $2, "StafferPhone" = $3
            WHERE "StafferId" = $4`;

      const values = [
        newEmployeeData.StafferName,
        newEmployeeData.StafferSurname,
        newEmployeeData.StafferPhone,
        newEmployeeData.StafferId,
      ];
      db.query(query, values, (error, result) => {
        if (error) {
          reject(error);
        } else {
          if (newProfilePic !== undefined) {
            const query = `UPDATE public."Staffer" SET "StafferImageUrl" = $1
            WHERE "StafferId" = $2`;

            const values = [newProfilePic.filename, newEmployeeData.StafferId];
            db.query(query, values, (error, result) => {
              if (error) {
                reject(error);
              } else {
                resolve(result);
              }
            });
          } else {
            resolve(result);
          }
        }
      });
    });
  }

  static updateStafferPassword(db, changePasswordData, StafferId) {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM public."Staffer" WHERE "StafferId" = $1`;

      db.query(query, [StafferId], (error, result) => {
        if (error) {
          resolve(error);
        } else {
          if (result.rows.length === 1) {
            const isPasswordValid = bcrypt.compareSync(
              changePasswordData.OldPassword,
              result.rows[0].StafferPassword
            );
            if (isPasswordValid) {
              bcrypt.hash(
                changePasswordData.NewPassword,
                10,
                (hashError, hashedPassword) => {
                  if (hashError) {
                    reject(hashError);
                  }

                  const query = `UPDATE public."Staffer" SET "StafferPassword" = $1 WHERE "StafferId" = $2`;

                  const values = [hashedPassword, StafferId];

                  db.query(query, values, (error, resultUpdate) => {
                    if (error) {
                      reject(error);
                    } else {
                      resolve(result.rows[0]);
                    }
                  });
                }
              );
            } else {
              resolve(false);
            }
          } else {
            resolve(false);
          }
        }
      });
    });
  }

  static deleteStaffer(db, EmployeeData) {
    return new Promise((resolve, reject) => {
      const query = `DELETE FROM public."Staffer" WHERE "StafferId" = $1`;

      db.query(query, [EmployeeData.EmployeeId], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result.affectedRows);
        }
      });
    });
  }
}

module.exports = StafferModel;
