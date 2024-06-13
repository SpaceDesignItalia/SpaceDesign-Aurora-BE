const bcrypt = require("bcrypt");

class StafferModel {
  static getAllStaffers(db) {
    return new Promise((resolve, reject) => {
      const query = `SELECT "StafferId" AS "EmployeeId", CONCAT("StafferName", ' ', "StafferSurname") "EmployeeFullName", 
      "StafferEmail" AS "EmployeeEmail", "StafferPhone" AS "EmployeePhone" FROM public."Staffer"`;

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

      db.query(query, [EmployeeId], (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result.rows);
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

              console.log(StafferId);
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
                const values = [
                  selectedRole.RoleId,
                  newEmployeeData.EmployeeId,
                ];
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
