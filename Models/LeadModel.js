const bcrypt = require("bcrypt");

class LeadModel {
  static getAllLeads(db) {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM "Contact" INNER JOIN "ContactObject" ON "Contact"."IdObject" = "ContactObject"."IdObject" 
      INNER JOIN "ContactBudgetRange" ON "Contact"."IdBudget" = "ContactBudgetRange"."IdBudget"`;
      db.query(query, (error, result) => {
        if (error) {
          reject(error);
        }
        resolve(result.rows);
      });
    });
  }

  static getLeadById(db, id) {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM "Contact" INNER JOIN "ContactObject" ON "Contact"."IdObject" = "ContactObject"."IdObject" 
    INNER JOIN "ContactBudgetRange" ON "Contact"."IdBudget" = "ContactBudgetRange"."IdBudget" WHERE "IdContact" = $1`;

      db.query(query, [id], (error, result) => {
        if (error) {
          reject(error);
        }
        resolve(result.rows);
      });
    });
  }

  static getAllObjects(db) {
    return new Promise((resolve, reject) => {
      const query = `SELECT "Name" FROM "ContactObject"`;
      db.query(query, (error, result) => {
        if (error) {
          reject(error);
        }
        resolve(result.rows);
      });
    });
  }

  static getAllRanges(db) {
    return new Promise((resolve, reject) => {
      const query = `SELECT "Range" FROM "ContactBudgetRange"`;
      db.query(query, (error, result) => {
        if (error) {
          reject(error);
        }
        resolve(result.rows);
      });
    });
  }

  static searchLeadByCompany(db, company) {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM "Contact" 
      INNER JOIN "ContactObject" ON "Contact"."IdObject" = "ContactObject"."IdObject" 
      INNER JOIN "ContactBudgetRange" ON "Contact"."IdBudget" = "ContactBudgetRange"."IdBudget" 
      WHERE "Company" ILIKE '%${company}%'`;
      db.query(query, (error, result) => {
        if (error) {
          reject(error);
        }

        resolve(result.rows);
      });
    });
  }

  static contactFormSubmit(db, contactData) {
    return new Promise((resolve, reject) => {
      // Query per ottenere l'Id dell'oggetto
      const getObjectQuery = `SELECT "IdObject" FROM "ContactObject" WHERE "Name" = $1`;
      const getRangeQuery = `SELECT "IdBudget" FROM "ContactBudgetRange" WHERE "Range" = $1`;

      const values = [
        contactData.firstName,
        contactData.lastName,
        contactData.email,
        contactData.company,
      ];

      // Recupera l'ID dell'oggetto
      db.query(getObjectQuery, [contactData.object], (error, objectResult) => {
        if (err) {
          console.error("Errore durante il recupero dell'oggetto:", error);
          return reject(error);
        }

        const objectId = objectResult.rows[0]?.IdObject;

        // Recupera l'ID del budget
        db.query(getRangeQuery, [contactData.budget], (err, budgetResult) => {
          if (err) {
            console.error("Errore durante il recupero del budget:", err);
            return reject(err);
          }

          const budgetId = budgetResult.rows[0]?.IdBudget;

          // Inserisce i dati nella tabella Contact
          const insertQuery = `INSERT INTO "Contact" ("FirstName", "LastName", "Email", "Company", "IdBudget", "IdObject", "Message") VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`;

          values.push(budgetId, objectId, contactData.message);

          db.query(insertQuery, values, (err, result) => {
            if (err) {
              console.error("Errore durante l'inserimento del contatto:", err);
              return reject(err);
            }

            resolve(result.rows[0]); // Restituisci i dati inseriti
          });
        });
      });
    });
  }

  static async deleteLead(db, id) {
    return new Promise((resolve, reject) => {
      const query = `DELETE FROM "Contact" WHERE "IdContact" = $1`;
      db.query(query, [id], (error, result) => {
        if (error) {
          reject(error);
        }
        resolve(result);
      });
    });
  }
}

module.exports = LeadModel;
