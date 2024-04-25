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
      const query = `UPDATE public."Company" SET "CompanyName" = $1, "CompanyAddress" = $2, "CompanyEmail" = $3, "CompanyPhone" = $4`;

      const values = [
        CompanyData.CompanyName,
        CompanyData.CompanyAddress,
        CompanyData.CompanyEmail,
        CompanyData.CompanyPhone,
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

  static deleteCompany(db, CompanyId) {
    return new Promise((resolve, reject) => {
      const query = `DELETE FROM public."Company" WHERE "CompanyId" = $1`;

      const values = [CompanyId];

      db.query(query, values, (error, result) => {
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
