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
          r."RoleName" AS "RoleName",
          s."StafferImageUrl" AS "EmployeeImageUrl"
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
      "StafferEmail" AS "EmployeeEmail", "StafferPhone" AS "EmployeePhone", "StafferImageUrl" AS "EmployeeImageUrl" FROM public."Staffer" WHERE "StafferId" = $1`;

      db.query(query, [StafferId], (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result.rows[0]);
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
      "StafferPhone" AS "EmployeePhone", "StafferImageUrl" AS "EmployeeImageUrl" FROM public."Staffer" 
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
      // Step 1: Check if the email already exists
      const checkEmailQuery = `SELECT "StafferId" FROM public."Staffer" WHERE "StafferEmail" = $1`;
      db.query(
        checkEmailQuery,
        [newStafferData.EmployeeEmail],
        (error, result) => {
          if (error) {
            reject(error); // Handle query error
            return;
          }

          // If a staffer with the same email already exists
          if (result.rows.length > 0) {
            reject(new Error("Un dipendente con la stessa email esiste già."));
            return;
          }

          // Step 2: If email does not exist, proceed to insert the new staffer
          const insertQuery = `INSERT INTO public."Staffer"("StafferName", "StafferSurname", "StafferEmail", "StafferPhone", "StafferPassword")
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
                reject(hashError); // Reject if hashing fails
                return;
              }
              values.push(hashedPassword);

              // Step 3: Insert the new staffer
              db.query(insertQuery, values, (error, result) => {
                if (error) {
                  reject(error);
                  return;
                }

                const StafferId = result.rows[0].StafferId;
                const roleInsertQuery = `INSERT INTO public."StafferRole"("StafferId", "RoleId")
                        VALUES ($1, $2)`;

                db.query(
                  roleInsertQuery,
                  [StafferId, selectedRole.RoleId],
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
          );
        }
      );
    });
  }

  static updateStaffer(db, newEmployeeData, selectedRole) {
    return new Promise((resolve, reject) => {
      // First, check if another user with the same email exists
      const emailCheckQuery = `SELECT "StafferId" FROM public."Staffer" 
                                  WHERE "StafferEmail" = $1 AND "StafferId" <> $2`;

      db.query(
        emailCheckQuery,
        [newEmployeeData.EmployeeEmail, newEmployeeData.EmployeeId],
        (error, result) => {
          if (error) {
            return reject(error);
          }

          // If there is a result, it means an email conflict exists
          if (result.rows.length > 0) {
            return reject(
              new Error("Conflict: Another staffer with the same email exists.")
            );
          }

          // If no conflict, proceed to update the staffer details
          const updateQuery = `UPDATE public."Staffer" SET "StafferName" = $1, 
                                 "StafferSurname" = $2, "StafferEmail" = $3, 
                                 "StafferPhone" = $4 WHERE "StafferId" = $5`;

          const values = [
            newEmployeeData.EmployeeName,
            newEmployeeData.EmployeeSurname,
            newEmployeeData.EmployeeEmail,
            newEmployeeData.EmployeePhone,
            newEmployeeData.EmployeeId,
          ];

          db.query(updateQuery, values, (error, result) => {
            if (error) {
              return reject(error);
            }

            // Check if role needs to be updated
            const roleCheckQuery = `SELECT "RoleId" FROM public."StafferRole" 
                                         WHERE "StafferId" = $1`;

            db.query(
              roleCheckQuery,
              [newEmployeeData.EmployeeId],
              (error, result) => {
                if (error) {
                  return reject(error);
                }

                if (result.rows[0]?.RoleId !== selectedRole) {
                  const updateRoleQuery = `UPDATE public."StafferRole" SET "RoleId" = $1 
                                                  WHERE "StafferId" = $2`;

                  const roleValues = [selectedRole, newEmployeeData.EmployeeId];
                  db.query(updateRoleQuery, roleValues, (error, result) => {
                    if (error) {
                      return reject(error);
                    }
                    resolve(result.rowCount); // Return number of affected rows
                  });
                } else {
                  resolve(result.rowCount); // No role change, just return the affected rows count
                }
              }
            );
          });
        }
      );
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
