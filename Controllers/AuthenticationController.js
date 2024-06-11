// controller/PermissionController.js
const Authentication = require("../Models/AuthenticationModel");

class AuthenticationController {
  static async login(req, res, db) {
    try {
      const LoginData = req.body.LoginData;

      console.log(LoginData);
      const account = await Authentication.loginStaffer(db, LoginData);
      if (!account)
        return res.status(404).json({ error: "Credenziali non valide" });

      if (LoginData.rememberMe) {
        // Imposta la durata del cookie di sessione a 30 giorni
        req.session.cookie.maxAge = 30 * 24 * 60 * 60 * 1000; // 30 giorni in millisecondi
      } else {
        // Imposta la durata del cookie di sessione alla durata di default (es. 1 ora)
        req.session.cookie.maxAge = 60 * 60 * 1000; // 1 ora in millisecondi
      }

      delete account.StafferPassword; // Elimina la password dall'oggetto account prima di salvare nella sessione

      req.session.account = account;
      res.status(200).json({
        message: "Login avvenuto con successo",
        groups: account.groups,
      });
    } catch (error) {
      console.error("Errore nel login:", error);
      res.status(500).send("Recupero dell'account fallito");
    }
  }

  static async CheckSession(req, res) {
    try {
      // Verifica se la sessione è stata creata
      if (req.session.account) {
        // Verifica se l'utente è autenticato
        res.json(true);
      } else {
        res.json(false);
      }
    } catch (error) {
      console.error("Errore nel recupero della sessione:", error);
      res.status(500).send("Recupero nel recupero della sessione");
    }
  }
}

module.exports = AuthenticationController;
