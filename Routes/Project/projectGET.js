// permissionGET.js
const express = require("express");
const router = express.Router();
const ProjectController = require("../../Controllers/ProjectController");

const projectGET = (db) => {
  // Definisci le route GET qui

  router.get("/GetAllStatus", (req, res) => {
    ProjectController.getAllStatus(req, res, db);
  });

  router.get("/GetAllBanners", (req, res) => {
    ProjectController.getAllBanners(req, res, db);
  });
  return router; // Ritorna il router per consentire l'utilizzo da parte dell'app principale
};

module.exports = projectGET;
