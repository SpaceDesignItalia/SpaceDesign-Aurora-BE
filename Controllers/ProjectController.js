// controller/PermissionController.js
const Project = require("../Models/ProjectModel");

class ProjectController {
  static async getAllStatus(req, res, db) {
    try {
      const status = await Project.getAllStatus(db);
      res.status(200).json(status);
    } catch (error) {
      console.error("Errore nel recupero degli status:", error);
      res.status(500).send("Recupero degli status fallito");
    }
  }

  static async getAllBanners(req, res, db) {
    try {
      const banners = await Project.getAllBanners(db);
      res.status(200).json(banners);
    } catch (error) {
      console.error("Errore nel recupero dei banners:", error);
      res.status(500).send("Recupero degi banners fallito");
    }
  }
}

module.exports = ProjectController;
