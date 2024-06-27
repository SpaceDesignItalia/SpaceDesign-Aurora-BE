// permissionUPDATE.js
const express = require("express");
const router = express.Router();
const ProjectController = require("../../Controllers/ProjectController");

const projectUPDATE = (db) => {
  // Definisci le route UPDATE qui
  router.put("/UpdateProjectTheme", (req, res) => {
    ProjectController.updateProjectTheme(req, res, db);
  });

  router.put("/UpdateProjectData", (req, res) => {
    ProjectController.updateProject(req, res, db);
  });
  return router;
};

module.exports = projectUPDATE;
