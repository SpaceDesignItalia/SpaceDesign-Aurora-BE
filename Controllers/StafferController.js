//StafferController.js
const Staffer = require("../Models/StafferModel");

class StafferController {
  static async getAllStaffers(res, db) {
    try {
      const Staffers = await Staffer.getAllStaffers(db);
      if (Staffers.length > 0) {
        res.status(200).json(groups);
      } else {
        res.status(404).send("Nessun dipendente trovato");
      }
    } catch (error) {
      console.error("Errore nel recupero dei dipendenti:", error);
      res.status(500).send("Recupero dei dipendenti fallita");
    }
  }
}

module.exports = StafferController;
