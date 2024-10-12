// permissionUPDATE.js
const express = require("express");
const router = express.Router();
const ProjectController = require("../../Controllers/ProjectController");
const authenticateMiddleware = require("../../middlewares/EmailService/Authentication/Authmiddleware");

const projectUPDATE = (db) => {
  // Definisci le route UPDATE qui
  router.put("/UpdateProjectTheme", authenticateMiddleware, (req, res) => {
    ProjectController.updateProjectTheme(req, res, db);
  });

  router.put("/UpdateTask", authenticateMiddleware, (req, res) => {
    ProjectController.updateTask(req, res, db);
  });

  router.put("/UpdateProjectData", authenticateMiddleware, (req, res) => {
    ProjectController.updateProject(req, res, db);
  });

  router.put("/UpdateCheckboxStatus", authenticateMiddleware, (req, res) => {
    ProjectController.updateCheckboxStatus(req, res, db);
  });

  router.put("/UpdateCheckboxText", authenticateMiddleware, (req, res) => {
    ProjectController.updateCheckboxText(req, res, db);
  });
  return router;
};

module.exports = projectUPDATE;
