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
      const query = `INSERT INTO public."Customer"("CustomerName", "CustomerSurname", "CustomerEmail", "CustomerPhone", "CustomerPassword")
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
          }
          values.push(hashedPassword);

          db.query(query, values, (error, result) => {
            if (error) {
              reject(error);
            } else {
              const CustomerId = result.rows[0].CustomerId;
              console.log(CustomerId);

              const query = `INSERT INTO public."CustomerCompany"("CustomerId", "CompanyId")
              VALUES ($1, $2)`;
              db.query(
                query,
                [CustomerId, customerData.CompanyId],
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

  static updateCustomerData(db, CustomerData, OldCompanyId) {
    return new Promise((resolve, reject) => {
      const query = `UPDATE public."Customer" SET "CustomerName" = $1, "CustomerSurname" = $2, "CustomerEmail" = $3, "CustomerPhone" = $4 WHERE "CustomerId" = $5`;

      const values = [
        CustomerData.CustomerName,
        CustomerData.CustomerSurname,
        CustomerData.CustomerEmail,
        CustomerData.CustomerPhone,
        CustomerData.CustomerId,
      ];

      db.query(query, values, (error, result) => {
        if (error) {
          reject(error);
        } else {
          const query = `SELECT "CompanyId" FROM public."CustomerCompany" WHERE "CustomerId" = $1`;
          db.query(query, [CustomerData.CustomerId], (error, result) => {
            if (error) {
              reject(error);
            } else {
              if (result.rows[0].CompanyId) {
                const query = `UPDATE public."CustomerCompany" SET "CompanyId" = $1 WHERE "CustomerId" = $2 AND "CompanyId" = $3`;
                const values = [
                  CustomerData.CompanyId,
                  CustomerData.CustomerId,
                  OldCompanyId,
                ];
                db.query(query, values, (error, result) => {
                  if (error) {
                    reject(error);
                  } else {
                    resolve(result.rows);
                  }
                });
              } else {
                const query = `INSERT INTO public."CustomerCompany"("CustomerId", "CompanyId")
                VALUES ($1, $2)`;
                const values = [
                  CustomerData.CustomerId,
                  CustomerData.CompanyId,
                ];
                db.query(query, values, (error, result) => {
                  if (error) {
                    reject(error);
                  } else {
                    resolve(result.rows);
                  }
                });
              }
            }
          });
        }
      });
    });
  }

  static deleteCustomer(db, CustomerData) {
    return new Promise((resolve, reject) => {
      const query = `DELETE FROM public."Customer" WHERE "CustomerId" = $1`;

      db.query(query, [CustomerData.CustomerId], (error, result) => {
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
