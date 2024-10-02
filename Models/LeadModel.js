const bcrypt = require("bcrypt");

class LeadModel {
  static getAllLeads(db) {
    const query = `SELECT * FROM "Contact" INNER JOIN "ContactObject" ON "Contact"."IdObject" = "ContactObject"."IdObject" INNER JOIN "ContactBudgetRange" ON "Contact"."IdBudget" = "ContactBudgetRange"."IdBudget"
    `;

    return new Promise((resolve, reject) => {
      db.query(query, (err, rows) => {
        if (err) {
          reject(err);
        }
        resolve(rows.rows);
      });
    });
  }

  static getLeadById(db, id) {
    const query = `SELECT * FROM "Contact" INNER JOIN "ContactObject" ON "Contact"."IdObject" = "ContactObject"."IdObject" INNER JOIN "ContactBudgetRange" ON "Contact"."IdBudget" = "ContactBudgetRange"."IdBudget" WHERE "IdContact" = $1`;

    return new Promise((resolve, reject) => {
      db.query(query, [id], (err, rows) => {
        if (err) {
          reject(err);
        }
        resolve(rows.rows);
      });
    });
  }

  static getAllObjects(db) {
    return new Promise((resolve, reject) => {
      db.query(`SELECT "Name" FROM "ContactObject"`, (err, rows) => {
        if (err) {
          reject(err);
        }
        resolve(rows.rows);
      });
    });
  }

  static getAllRanges(db) {
    const query = `SELECT "Range" FROM "ContactBudgetRange"`;
    return new Promise((resolve, reject) => {
      db.query(query, (err, rows) => {
        if (err) {
          reject(err);
        }
        resolve(rows.rows);
      });
    });
  }

  static searchLeadByCompany(db, company) {
    const query = `
        SELECT * FROM "Contact" 
        INNER JOIN "ContactObject" ON "Contact"."IdObject" = "ContactObject"."IdObject" 
        INNER JOIN "ContactBudgetRange" ON "Contact"."IdBudget" = "ContactBudgetRange"."IdBudget" 
        WHERE "Company" ILIKE $1`;

    return new Promise((resolve, reject) => {
      const searchValue = `%${company}%`;
      db.query(query, [searchValue], (err, rows) => {
        if (err) {
          reject(err);
        }
        resolve(rows.rows);
      });
    });
  }

  static async contactFormSubmit(
    db,
    firstName,
    lastName,
    email,
    company,
    object,
    budget,
    message
  ) {
    const getObjectQuery = `SELECT "IdObject" FROM "ContactObject" WHERE "Name" = $1`;
    const getRangeQuery = `SELECT "IdBudget" FROM "ContactBudgetRange" WHERE "Range" = $1`;

    try {
      // Recupera l'ID dell'oggetto
      const objectResult = await new Promise((resolve, reject) => {
        db.query(getObjectQuery, [object], (err, rows) => {
          if (err) {
            return reject(err);
          }
          resolve(rows[0]?.IdObject);
        });
      });

      // Recupera l'ID del budget
      const budgetResult = await new Promise((resolve, reject) => {
        db.query(getRangeQuery, [budget], (err, rows) => {
          if (err) {
            return reject(err);
          }
          resolve(rows[0]?.IdBudget);
        });
      });

      // Inserisce i dati nella tabella Contact
      const query = `INSERT INTO "Contact" ("FirstName", "LastName", "Email", "Company", "IdBudget", "IdObject", "Message") VALUES ($1, $2, $3, $4, $5, $6, $7)`;
      return new Promise((resolve, reject) => {
        db.query(
          query,
          [
            firstName,
            lastName,
            email,
            company,
            budgetResult,
            objectResult,
            message,
          ],
          (err) => {
            if (err) {
              return reject(err);
            }
            resolve();
          }
        );
      });
    } catch (error) {
      console.error("Errore nell'invio dei dati:", error);
      throw error;
    }
  }
  static async deleteLead(db, id) {
    const query = `DELETE FROM "Contact" WHERE "IdContact" = $1`;

    return new Promise((resolve, reject) =>
      db.query(query, [id], (err) => {
        if (err) {
          reject(err);
        }
        resolve();
      })
    );
  }
}

module.exports = LeadModel;
