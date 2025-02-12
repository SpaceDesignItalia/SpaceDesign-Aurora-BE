const bcrypt = require("bcrypt");
const EmailService = require("../middlewares/EmailService/EmailService");

class CustomerModel {
  static getAllCustomers(db) {
    return new Promise((resolve, reject) => {
      const query = `SELECT "CustomerId", CONCAT("CustomerName", ' ', "CustomerSurname") "CustomerFullName", "CustomerEmail", "CustomerPhone", "CustomerImageUrl", "IsActive"
      FROM public."Customer";`;

      db.query(query, (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result.rows);
        }
      });
    });
  }

  static getCustomerById(db, CustomerId) {
    return new Promise((resolve, reject) => {
      const query = `SELECT "CustomerId", "CustomerName", "CustomerSurname", "CustomerEmail", "CustomerPhone", "CompanyId", "IsActive"
      FROM public."Customer"
      LEFT JOIN public."CustomerCompany" USING("CustomerId")
      WHERE "CustomerId" = $1;`;

      db.query(query, [CustomerId], (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result.rows);
        }
      });
    });
  }

  static getCompanyAssociatedByCustomerId(db, CustomerId) {
    return new Promise((resolve, reject) => {
      const query = `SELECT "CompanyId", "CompanyName"
      FROM public."CustomerCompany"
      INNER JOIN public."Company" USING("CompanyId")
      WHERE "CustomerId" = $1`;

      const values = [CustomerId];
      db.query(query, values, (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result.rows);
        }
      });
    });
  }

  static searchCustomerByEmail(db, CustomerEmail) {
    return new Promise((resolve, reject) => {
      const query = `SELECT "CustomerId", CONCAT("CustomerName",' ', "CustomerSurname") "CustomerFullName", "CustomerEmail", "CustomerPhone", "IsActive" 
      FROM public."Customer" WHERE "CustomerEmail" LIKE '%${CustomerEmail}%'`;

      db.query(query, (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result.rows);
        }
      });
    });
  }

  static addCustomer(db, customerData) {
    return new Promise((resolve, reject) => {
      // Step 1: Check if a customer with the same email already exists
      const emailCheckQuery = `SELECT * FROM public."Customer" WHERE "CustomerEmail" = $1`;
      const emailCheckValues = [customerData.CustomerEmail];

      db.query(
        emailCheckQuery,
        emailCheckValues,
        (emailCheckError, emailCheckResult) => {
          if (emailCheckError) {
            console.error(
              "Errore durante la verifica dell'email:",
              emailCheckError
            );
            return reject(emailCheckError);
          }

          if (emailCheckResult.rows.length > 0) {
            return reject(new Error("Un cliente con questa email esiste già."));
          }

          // Step 2: Proceed with inserting the new customer if email is unique
          let insertQuery;
          let values;

          if (customerData.IsActive) {
            insertQuery = `INSERT INTO public."Customer"("CustomerName", "CustomerSurname", "CustomerEmail", "CustomerPhone", "IsActive", "CustomerPassword")
                          VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`;

            bcrypt.hash(
              customerData.CustomerPassword,
              10,
              async (hashError, hashedPassword) => {
                if (hashError) {
                  console.error(
                    "Errore durante l'hashing della password:",
                    hashError
                  );
                  return reject(hashError);
                }

                values = [
                  customerData.CustomerName,
                  customerData.CustomerSurname,
                  customerData.CustomerEmail,
                  customerData.CustomerPhone,
                  customerData.IsActive,
                  hashedPassword,
                ];

                db.query(insertQuery, values, (error, result) => {
                  if (error) {
                    return reject(error);
                  }
                  const CustomerId = result.rows[0].CustomerId;

                  const companyLinkQuery = `INSERT INTO public."CustomerCompany"("CustomerId", "CompanyId")
                                        VALUES ($1, $2)`;
                  db.query(
                    companyLinkQuery,
                    [CustomerId, customerData.CompanyId],
                    (linkError, linkResult) => {
                      if (linkError) {
                        return reject(linkError);
                      }
                      resolve(result.rows[0]);
                    }
                  );
                });
              }
            );
          } else {
            // Se IsActive è false, non creiamo la password
            insertQuery = `INSERT INTO public."Customer"("CustomerName", "CustomerSurname", "CustomerEmail", "CustomerPhone", "IsActive")
                          VALUES ($1, $2, $3, $4, $5) RETURNING *`;

            values = [
              customerData.CustomerName,
              customerData.CustomerSurname,
              customerData.CustomerEmail,
              customerData.CustomerPhone,
              customerData.IsActive,
            ];

            db.query(insertQuery, values, (error, result) => {
              if (error) {
                return reject(error);
              }
              const CustomerId = result.rows[0].CustomerId;

              const companyLinkQuery = `INSERT INTO public."CustomerCompany"("CustomerId", "CompanyId")
                                      VALUES ($1, $2)`;
              db.query(
                companyLinkQuery,
                [CustomerId, customerData.CompanyId],
                (linkError, linkResult) => {
                  if (linkError) {
                    return reject(linkError);
                  }
                  resolve(result.rows[0]);
                }
              );
            });
          }
        }
      );
    });
  }

  static updateCustomerData(db, CustomerData, OldCompanyId) {
    return new Promise((resolve, reject) => {
      // Verifichiamo che CustomerId sia valido
      if (!CustomerData.CustomerId) {
        return reject(new Error("CustomerId non valido"));
      }

      // Prima verifichiamo lo stato attuale di IsActive
      const checkCurrentStateQuery = `SELECT "IsActive", "CustomerName", "CustomerSurname", "CustomerEmail" FROM public."Customer" WHERE "CustomerId" = $1`;
      db.query(
        checkCurrentStateQuery,
        [CustomerData.CustomerId],
        (stateError, stateResult) => {
          if (stateError) {
            return reject(stateError);
          }

          if (!stateResult.rows.length) {
            return reject(new Error("Cliente non trovato"));
          }

          const wasInactive = !stateResult.rows[0].IsActive;
          const becomingActive = wasInactive && CustomerData.IsActive;
          const becomingInactive =
            stateResult.rows[0].IsActive && !CustomerData.IsActive;

          // Step 1: Check if email already exists (excluding the current CustomerId)
          const checkEmailQuery = `SELECT "CustomerId" FROM public."Customer" WHERE "CustomerEmail" = $1 AND "CustomerId" != $2`;
          db.query(
            checkEmailQuery,
            [CustomerData.CustomerEmail, CustomerData.CustomerId],
            (emailError, emailResult) => {
              if (emailError) {
                reject(emailError);
              } else if (emailResult.rows.length > 0) {
                const error = new Error("Email già in uso.");
                error.statusCode = 409;
                reject(error);
              } else {
                if (becomingActive) {
                  // Genera una password casuale di 8 caratteri
                  const generatedPassword = Math.random()
                    .toString(36)
                    .slice(-8);
                  CustomerData.CustomerPassword = generatedPassword;

                  bcrypt.hash(
                    CustomerData.CustomerPassword,
                    10,
                    (hashError, hashedPassword) => {
                      if (hashError) {
                        return reject(hashError);
                      }

                      const updateQuery = `UPDATE public."Customer" 
                                 SET "CustomerName" = $1, 
                                     "CustomerSurname" = $2, 
                                     "CustomerEmail" = $3, 
                                     "CustomerPhone" = $4,
                                     "IsActive" = $5,
                                     "CustomerPassword" = $6
                                 WHERE "CustomerId" = $7 RETURNING *`;

                      const values = [
                        CustomerData.CustomerName,
                        CustomerData.CustomerSurname,
                        CustomerData.CustomerEmail,
                        CustomerData.CustomerPhone,
                        CustomerData.IsActive,
                        hashedPassword,
                        CustomerData.CustomerId,
                      ];

                      db.query(
                        updateQuery,
                        values,
                        (updateError, updateResult) => {
                          if (updateError) {
                            reject(updateError);
                          } else {
                            const customerWithPassword = {
                              ...updateResult.rows[0],
                              plainPassword: generatedPassword,
                            };
                            this.updateCompanyRelation(
                              db,
                              CustomerData,
                              OldCompanyId,
                              () => resolve(customerWithPassword),
                              reject
                            );
                          }
                        }
                      );
                    }
                  );
                } else {
                  // Update normale senza password
                  const updateQuery = `UPDATE public."Customer" 
                                 SET "CustomerName" = $1, 
                                     "CustomerSurname" = $2, 
                                     "CustomerEmail" = $3, 
                                     "CustomerPhone" = $4,
                                     "IsActive" = $5,
                                     "CustomerPassword" = ${
                                       becomingInactive
                                         ? "NULL"
                                         : '"CustomerPassword"'
                                     }
                                 WHERE "CustomerId" = $6 RETURNING *`;

                  const values = [
                    CustomerData.CustomerName,
                    CustomerData.CustomerSurname,
                    CustomerData.CustomerEmail,
                    CustomerData.CustomerPhone,
                    CustomerData.IsActive,
                    CustomerData.CustomerId,
                  ];

                  db.query(updateQuery, values, (updateError, updateResult) => {
                    if (updateError) {
                      reject(updateError);
                    } else {
                      // Se il cliente sta diventando inattivo, invia l'email di notifica
                      if (becomingInactive) {
                        EmailService.sendCustomerEliminationMail(
                          stateResult.rows[0].CustomerEmail,
                          stateResult.rows[0].CustomerName,
                          stateResult.rows[0].CustomerSurname
                        );
                      }

                      this.updateCompanyRelation(
                        db,
                        CustomerData,
                        OldCompanyId,
                        () => resolve(updateResult.rows[0]),
                        reject
                      );
                    }
                  });
                }
              }
            }
          );
        }
      );
    });
  }

  // Metodo helper per aggiornare la relazione con l'azienda
  static updateCompanyRelation(
    db,
    CustomerData,
    OldCompanyId,
    resolve,
    reject
  ) {
    const companyQuery = `SELECT "CompanyId" FROM public."CustomerCompany" WHERE "CustomerId" = $1`;
    db.query(
      companyQuery,
      [CustomerData.CustomerId],
      (companyError, companyResult) => {
        if (companyError) {
          reject(companyError);
        } else {
          if (companyResult.rows[0] && companyResult.rows[0].CompanyId) {
            const updateCompanyQuery = `UPDATE public."CustomerCompany" SET "CompanyId" = $1 WHERE "CustomerId" = $2 AND "CompanyId" = $3`;
            const updateValues = [
              CustomerData.CompanyId,
              CustomerData.CustomerId,
              OldCompanyId,
            ];
            db.query(
              updateCompanyQuery,
              updateValues,
              (companyUpdateError, companyUpdateResult) => {
                if (companyUpdateError) {
                  reject(companyUpdateError);
                } else {
                  resolve(companyUpdateResult.rows);
                }
              }
            );
          } else {
            const insertCompanyQuery = `INSERT INTO public."CustomerCompany"("CustomerId", "CompanyId") VALUES ($1, $2)`;
            const insertValues = [
              CustomerData.CustomerId,
              CustomerData.CompanyId,
            ];
            db.query(
              insertCompanyQuery,
              insertValues,
              (companyInsertError, companyInsertResult) => {
                if (companyInsertError) {
                  reject(companyInsertError);
                } else {
                  resolve(companyInsertResult.rows);
                }
              }
            );
          }
        }
      }
    );
  }

  static settingsUpdateCustomer(db, newCustomerData, newProfilePic) {
    return new Promise((resolve, reject) => {
      const query = `UPDATE public."Customer" 
                    SET "CustomerName" = $1, 
                        "CustomerSurname" = $2, 
                        "CustomerEmail" = $3, 
                        "CustomerPhone" = $4,
                        "IsActive" = $5
                    WHERE "CustomerId" = $6`;

      const values = [
        newCustomerData.CustomerName,
        newCustomerData.CustomerSurname,
        newCustomerData.CustomerEmail,
        newCustomerData.CustomerPhone,
        newCustomerData.IsActive,
        newCustomerData.CustomerId,
      ];

      db.query(query, values, (error, result) => {
        if (error) {
          reject(error);
        } else {
          if (newProfilePic !== undefined) {
            const query = `UPDATE public."Customer" SET "CustomerImageUrl" = $1
            WHERE "CustomerId" = $2`;

            const values = [newProfilePic.filename, newCustomerData.CustomerId];
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

  static updateCustomerPassword(db, changePasswordData, CustomerId) {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM public."Customer" WHERE "CustomerId" = $1`;

      db.query(query, [CustomerId], (error, result) => {
        if (error) {
          resolve(error);
        } else {
          if (result.rows.length === 1) {
            const isPasswordValid = bcrypt.compareSync(
              changePasswordData.OldPassword,
              result.rows[0].CustomerPassword
            );
            if (isPasswordValid) {
              bcrypt.hash(
                changePasswordData.NewPassword,
                10,
                (hashError, hashedPassword) => {
                  if (hashError) {
                    reject(hashError);
                  }

                  const query = `UPDATE public."Customer" SET "CustomerPassword" = $1 WHERE "CustomerId" = $2`;

                  const values = [hashedPassword, CustomerId];

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

  static deleteCustomer(db, CustomerId) {
    return new Promise((resolve, reject) => {
      const query = `DELETE FROM public."Customer" WHERE "CustomerId" = $1`;

      db.query(query, [CustomerId], (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result.rows); // Restituisce eventuali righe risultanti, se necessario
        }
      });
    });
  }
}

module.exports = CustomerModel;
