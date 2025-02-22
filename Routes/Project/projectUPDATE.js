// permissionUPDATE.js
const express = require("express");
const router = express.Router();
const ProjectController = require("../../Controllers/ProjectController");
const authenticateMiddleware = require("../../middlewares/Authentication/Authmiddleware");

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

  router.put("/UpdateComment", authenticateMiddleware, (req, res) => {
    ProjectController.updateComment(req, res, db);
  });

  router.put("/UpdateFolder", authenticateMiddleware, (req, res) => {
    ProjectController.updateFolder(req, res, db);
  });

  router.put("/RenameFile", authenticateMiddleware, (req, res) => {
    ProjectController.renameFile(req, res, db);
  });

  router.put("/ArchiveTask", authenticateMiddleware, (req, res) => {
    ProjectController.archiveTask(req, res, db);
  });
  return router;
};

module.exports = projectUPDATE;
