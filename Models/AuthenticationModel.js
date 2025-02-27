const bcrypt = require("bcrypt");
const CustomerModel = require("./CustomerModel");

class StafferModel {
  static loginStaffer(db, LoginData) {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM public."Staffer" WHERE "StafferEmail" = $1`;

      db.query(query, [LoginData.email], (error, result) => {
        if (error) {
          reject(error);
        } else {
          if (result.rows.length === 1) {
            const isPasswordValid = bcrypt.compareSync(
              LoginData.password,
              result.rows[0].StafferPassword
            );
            if (isPasswordValid) {
              resolve(result.rows[0]);
            } else {
              reject(false);
            }
          } else {
            resolve(false);
          }
        }
      });
    });
  }

  static loginCustomer(db, LoginData) {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM public."Customer" WHERE "CustomerEmail" = $1`;

      db.query(query, [LoginData.email], (error, result) => {
        if (error) {
          reject(error);
        } else {
          if (result.rows.length === 1) {
            const isPasswordValid = bcrypt.compareSync(
              LoginData.password,
              result.rows[0].CustomerPassword
            );

            if (isPasswordValid) {
              resolve(result.rows[0]);
            } else {
              reject(false);
            }
          } else {
            reject(false);
          }
        }
      });
    });
  }

  static passwordRecovery(db, Email, recoveryCode) {
    return new Promise((resolve, reject) => {
      // Prima controlla se è uno staffer
      const checkStafferQuery = `SELECT * FROM public."Staffer" WHERE "StafferEmail" = $1`;

      db.query(checkStafferQuery, [Email])
        .then((stafferResult) => {
          if (stafferResult.rows.length === 1) {
            // È uno staffer, aggiorna il recovery code
            const updateQuery = `UPDATE public."Staffer" SET "RecoveryCode" = $1 WHERE "StafferEmail" = $2 RETURNING *`;
            return db
              .query(updateQuery, [recoveryCode, Email])
              .then((result) => {
                if (result.rows && result.rows.length > 0) {
                  // Imposta il timer per cancellare il codice dopo 5 minuti
                  setTimeout(() => {
                    const clearQuery = `UPDATE public."Staffer" SET "RecoveryCode" = NULL WHERE "StafferEmail" = $1 RETURNING *`;
                    db.query(clearQuery, [Email])
                      .then(() => {
                        console.log(
                          "RecoveryCode cancellato con successo dopo 5 minuti per Staffer"
                        );
                      })
                      .catch((error) => {
                        console.error(
                          "Errore durante la cancellazione del RecoveryCode per Staffer:",
                          error
                        );
                      });
                  }, 5 * 60 * 1000);

                  return {
                    success: true,
                    data: result.rows[0],
                    type: "staffer",
                  };
                }
                return { success: false };
              });
          } else {
            // Non è uno staffer, controlla se è un customer attivo
            const checkCustomerQuery = `SELECT * FROM public."Customer" WHERE "CustomerEmail" = $1 AND "IsActive" = true`;
            return db
              .query(checkCustomerQuery, [Email])
              .then((customerResult) => {
                if (customerResult.rows.length === 1) {
                  const updateQuery = `UPDATE public."Customer" SET "RecoveryCode" = $1 WHERE "CustomerEmail" = $2 RETURNING *`;
                  return db
                    .query(updateQuery, [recoveryCode, Email])
                    .then((result) => {
                      if (result.rows && result.rows.length > 0) {
                        // Imposta il timer per cancellare il codice dopo 5 minuti
                        setTimeout(() => {
                          const clearQuery = `UPDATE public."Customer" SET "RecoveryCode" = NULL WHERE "CustomerEmail" = $1 RETURNING *`;
                          db.query(clearQuery, [Email])
                            .then(() => {
                              console.log(
                                "RecoveryCode cancellato con successo dopo 5 minuti per Customer"
                              );
                            })
                            .catch((error) => {
                              console.error(
                                "Errore durante la cancellazione del RecoveryCode per Customer:",
                                error
                              );
                            });
                        }, 5 * 60 * 1000);

                        return {
                          success: true,
                          data: result.rows[0],
                          type: "customer",
                        };
                      }
                      return { success: false };
                    });
                }
                // Non è né staffer né customer attivo
                return { success: false, notFound: true };
              });
          }
        })
        .then((result) => {
          if (result.success) {
            resolve(result.data);
          } else if (result.notFound) {
            reject(
              new Error("Email non valida o utente non trovato/non attivo")
            );
          } else {
            reject(new Error("Errore durante il recupero password"));
          }
        })
        .catch((error) => {
          console.error("Errore durante il recupero password:", error);
          reject(error);
        });
    });
  }

  static verifyOtp(db, Code) {
    return new Promise((resolve, reject) => {
      // Prima controlla se è uno staffer
      const stafferQuery = `SELECT 'staffer' as type FROM public."Staffer" WHERE "RecoveryCode" = $1`;

      db.query(stafferQuery, [Code])
        .then((stafferResult) => {
          if (stafferResult.rows.length === 1) {
            resolve({ valid: true, type: "staffer" });
          } else {
            // Se non è uno staffer, controlla se è un customer attivo
            const customerQuery = `
              SELECT 'customer' as type 
              FROM public."Customer" 
              WHERE "RecoveryCode" = $1 
              AND "IsActive" = true
            `;

            return db.query(customerQuery, [Code]);
          }
        })
        .then((customerResult) => {
          if (customerResult && customerResult.rows.length === 1) {
            resolve({ valid: true, type: "customer" });
          } else if (!customerResult) {
            // Questo caso si verifica quando è già stato trovato uno staffer
            return;
          } else {
            resolve({ valid: false, type: null });
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  static ResetPassword(db, Email, Code, newPassword) {
    return new Promise((resolve, reject) => {
      // Prima verifica se è uno staffer
      const checkStafferCode = `SELECT * FROM public."Staffer" WHERE "RecoveryCode" = $1 AND "StafferEmail" = $2`;

      db.query(checkStafferCode, [Code, Email])
        .then((stafferResult) => {
          if (stafferResult.rows.length === 1) {
            // È uno staffer, procedi con l'aggiornamento password
            return bcrypt
              .hash(newPassword, 10)
              .then((hashedPassword) => {
                const updateQuery = `
                  UPDATE public."Staffer" 
                  SET "StafferPassword" = $1, "RecoveryCode" = NULL 
                  WHERE "StafferEmail" = $2 AND "RecoveryCode" = $3 
                  RETURNING *
                `;
                return db.query(updateQuery, [hashedPassword, Email, Code]);
              })
              .then((result) => {
                if (result.rows && result.rows.length > 0) {
                  return {
                    success: true,
                    data: result.rows[0],
                    type: "staffer",
                  };
                }
                return { success: false };
              });
          } else {
            // Non è uno staffer, controlla se è un customer attivo
            const checkCustomerCode = `
              SELECT * FROM public."Customer" 
              WHERE "RecoveryCode" = $1 
              AND "CustomerEmail" = $2 
              AND "IsActive" = true
            `;
            return db
              .query(checkCustomerCode, [Code, Email])
              .then((customerResult) => {
                if (customerResult.rows.length === 1) {
                  return bcrypt
                    .hash(newPassword, 10)
                    .then((hashedPassword) => {
                      const updateQuery = `
                        UPDATE public."Customer" 
                        SET "CustomerPassword" = $1, "RecoveryCode" = NULL 
                        WHERE "CustomerEmail" = $2 AND "RecoveryCode" = $3 
                        RETURNING *
                      `;
                      return db.query(updateQuery, [
                        hashedPassword,
                        Email,
                        Code,
                      ]);
                    })
                    .then((result) => {
                      if (result.rows && result.rows.length > 0) {
                        return {
                          success: true,
                          data: result.rows[0],
                          type: "customer",
                        };
                      }
                      return { success: false };
                    });
                }
                // Non è né staffer né customer
                return { success: false, notFound: true };
              });
          }
        })
        .then((result) => {
          if (result.success) {
            resolve(result.data);
          } else if (result.notFound) {
            reject(
              new Error("Codice di recupero non valido o utente non trovato")
            );
          } else {
            reject(new Error("Errore durante il reset della password"));
          }
        })
        .catch((error) => {
          console.error("Errore durante il reset della password:", error);
          reject(error);
        });
    });
  }

  static checkStafferEmail(db, email) {
    return new Promise((resolve, reject) => {
      const query = `SELECT EXISTS(SELECT 1 FROM public."Staffer" WHERE "StafferEmail" = $1)`;

      db.query(query, [email], (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result.rows[0].exists);
        }
      });
    });
  }
}

module.exports = StafferModel;
