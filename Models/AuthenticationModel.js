const bcrypt = require("bcrypt");

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

            console.log("ValidPassword: ", isPasswordValid);
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
}

module.exports = StafferModel;
