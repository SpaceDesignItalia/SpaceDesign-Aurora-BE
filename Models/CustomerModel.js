const bcrypt = require("bcrypt");

class CustomerModel {
  static getAllCustomers(db) {
    return new Promise((resolve, reject) => {
      const query = `SELECT "CustomerId", CONCAT("CustomerName", ' ', "CustomerSurname") "CustomerFullName", "CustomerEmail", "CustomerPhone"
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
      const query = `SELECT "CustomerId", "CustomerName", "CustomerSurname", "CustomerEmail", "CustomerPhone", "CompanyId"
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
      const query = `SELECT "CustomerId", CONCAT("CustomerName",' ', "CustomerSurname") "CustomerFullName", "CustomerEmail", "CustomerPhone" 
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
            // Email already exists, reject with a specific error message
            return reject(new Error("Un cliente con questa email esiste già."));
          }

          // Step 2: Proceed with inserting the new customer if email is unique
          const insertQuery = `INSERT INTO public."Customer"("CustomerName", "CustomerSurname", "CustomerEmail", "CustomerPhone", "CustomerPassword")
                             VALUES ($1, $2, $3, $4, $5) RETURNING *`;

          const values = [
            customerData.CustomerName,
            customerData.CustomerSurname,
            customerData.CustomerEmail,
            customerData.CustomerPhone,
          ];

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
              values.push(hashedPassword);

              db.query(insertQuery, values, (error, result) => {
                if (error) {
                  return reject(error);
                } else {
                  const CustomerId = result.rows[0].CustomerId;

                  const companyLinkQuery = `INSERT INTO public."CustomerCompany"("CustomerId", "CompanyId")
                                          VALUES ($1, $2)`;
                  db.query(
                    companyLinkQuery,
                    [CustomerId, customerData.CompanyId],
                    (linkError, linkResult) => {
                      if (linkError) {
                        return reject(linkError);
                      } else {
                        resolve(result.rows[0]);
                      }
                    }
                  );
                }
              });
            }
          );
        }
      );
    });
  }

  static updateCustomerData(db, CustomerData, OldCompanyId) {
    return new Promise((resolve, reject) => {
      // Step 1: Check if email already exists (excluding the current CustomerId)
      const checkEmailQuery = `SELECT "CustomerId" FROM public."Customer" WHERE "CustomerEmail" = $1 AND "CustomerId" != $2`;
      db.query(
        checkEmailQuery,
        [CustomerData.CustomerEmail, CustomerData.CustomerId],
        (emailError, emailResult) => {
          if (emailError) {
            reject(emailError);
          } else if (emailResult.rows.length > 0) {
            // Email already in use by another customer
            const error = new Error("Email già in uso.");
            error.statusCode = 409; // Conflict
            reject(error);
          } else {
            // Step 2: Proceed with the update if no duplicate email
            const updateQuery = `UPDATE public."Customer" SET "CustomerName" = $1, "CustomerSurname" = $2, "CustomerEmail" = $3, "CustomerPhone" = $4 WHERE "CustomerId" = $5`;
            const values = [
              CustomerData.CustomerName,
              CustomerData.CustomerSurname,
              CustomerData.CustomerEmail,
              CustomerData.CustomerPhone,
              CustomerData.CustomerId,
            ];

            db.query(updateQuery, values, (updateError, updateResult) => {
              if (updateError) {
                reject(updateError);
              } else {
                const companyQuery = `SELECT "CompanyId" FROM public."CustomerCompany" WHERE "CustomerId" = $1`;
                db.query(
                  companyQuery,
                  [CustomerData.CustomerId],
                  (companyError, companyResult) => {
                    if (companyError) {
                      reject(companyError);
                    } else {
                      if (
                        companyResult.rows[0] &&
                        companyResult.rows[0].CompanyId
                      ) {
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
            });
          }
        }
      );
    });
  }

  static settingsUpdateCustomer(db, newCustomerData, newProfilePic) {
    return new Promise((resolve, reject) => {
      const query = `UPDATE public."Customer" SET "CustomerName" = $1, "CustomerSurname" = $2, "CustomerEmail" = $3, "CustomerPhone" = $4
            WHERE "CustomerId" = $5`;

      const values = [
        newCustomerData.CustomerName,
        newCustomerData.CustomerSurname,
        newCustomerData.CustomerEmail,
        newCustomerData.CustomerPhone,
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
