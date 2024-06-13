class CompanyModel {
  static getAllCompany(db) {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM public."Company"`;

      db.query(query, (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result.rows);
        }
      });
    });
  }

  static getCompanyByIdAndName(db, CompanyId, CompanyName) {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM public."Company" WHERE "CompanyId" = $1 AND "CompanyName" = $2`;

      const values = [CompanyId, CompanyName];
      db.query(query, values, (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result.rows);
        }
      });
    });
  }

  static searchCompanyByName(db, CompanyName) {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM public."Company" WHERE "CompanyName" LIKE '%${CompanyName}%'`;

      db.query(query, (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result.rows);
        }
      });
    });
  }

  static getCompanyMembersById(db, CompanyId) {
    return new Promise((resolve, reject) => {
      const query = `SELECT "CustomerId", CONCAT("CustomerName",' ',"CustomerSurname") CustomerFullName, "CustomerEmail", "CustomerPhone"
      FROM public."Customer"
      INNER JOIN public."CustomerCompany" USING("CustomerId")
      INNER JOIN public."Company" USING("CompanyId") 
      WHERE "CompanyId" = $1 `;

      db.query(query, [CompanyId], (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result.rows);
        }
      });
    });
  }

  static addCompany(companyData, db) {
    return new Promise((resolve, reject) => {
      const query = `INSERT INTO public."Company"("CompanyName", "CompanyAddress", "CompanyEmail", "CompanyPhone")
        VALUES ($1, $2, $3, $4)`;

      const values = [
        companyData.companyName,
        companyData.companyAddress,
        companyData.companyEmail,
        companyData.companyPhone,
      ];

      db.query(query, values, (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result.rows); // Restituisce eventuali righe risultanti, se necessario
        }
      });
    });
  }

  static updateCompanyData(db, CompanyData) {
    return new Promise((resolve, reject) => {
      const query = `UPDATE public."Company" SET "CompanyName" = $1, "CompanyAddress" = $2, "CompanyEmail" = $3, "CompanyPhone" = $4 WHERE "CompanyId =  $5`;

      const values = [
        CompanyData.CompanyName,
        CompanyData.CompanyAddress,
        CompanyData.CompanyEmail,
        CompanyData.CompanyPhone,
        CompanyData.CompanyId,
      ];

      db.query(query, values, (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result.rows); // Restituisce eventuali righe risultanti, se necessario
        }
      });
    });
  }

  static deleteCompany(db, CompanyData) {
    return new Promise((resolve, reject) => {
      const query = `DELETE FROM public."Company" WHERE "CompanyId" = $1`;

      db.query(query, [CompanyData.CompanyId], (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result.rows); // Restituisce eventuali righe risultanti, se necessario
        }
      });
    });
  }
}

module.exports = CompanyModel;
