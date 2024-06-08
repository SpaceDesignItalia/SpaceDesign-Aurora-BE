class StafferModel {
  static getAllStaffers(db) {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM public."Staffer"`;

      db.query(query, (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result.rows);
        }
      });
    });
  }
}

module.exports = StafferModel;
