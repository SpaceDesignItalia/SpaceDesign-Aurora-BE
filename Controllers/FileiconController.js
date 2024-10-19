// controller/FileiconController.js
const path = require("path");
const fs = require("fs");

class FileiconController {
  static async getIconByName(req, res) {
    try {
      const fileName = req.query.fileName; // Il nome del file (senza estensione)

      const fileExtension = path
        .extname(fileName)
        .toLowerCase()
        .replace(".", "");

      // Definisce il percorso della cartella delle icone
      const iconDirectory = path.join(__dirname, "../public/fileIcons");

      // Definisce il percorso dell'icona basato su `typeName`
      const iconPath = path.join(iconDirectory, `${fileExtension}.png`);

      // Se il file esiste, restituisce l'icona
      if (fs.existsSync(iconPath)) {
        const relativeIconPath = path.join(
          "/fileIcons",
          `${fileExtension}.png`
        );
        res.send(relativeIconPath);
      } else {
        res.send("/fileIcons/default-icon.png");
      }
    } catch (error) {
      console.error("Errore nel recupero dell'icona:", error);
      res.status(500).send("Errore interno del server");
    }
  }
}

module.exports = FileiconController;
