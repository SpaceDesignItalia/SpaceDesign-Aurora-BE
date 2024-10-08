// permissionDELETE.js
const express = require("express");
const router = express.Router();
const ProjectController = require("../../Controllers/ProjectController");
const authenticateMiddleware = require("../../middlewares/EmailService/Authentication/Authmiddleware");

const projectDELETE = (db) => {
  router.delete(
    "/RemoveMemberFromProjectById",
    authenticateMiddleware,
    (req, res) => {
      ProjectController.removeMemberFromProjectById(req, res, db);
    }
  );

  router.delete(
    "/RemoveLinkFromProject",
    authenticateMiddleware,
    (req, res) => {
      ProjectController.removeLinkFromProject(req, res, db);
    }
  );

  router.delete("/DeleteProject", authenticateMiddleware, (req, res) => {
    ProjectController.deleteProject(req, res, db);
  });

  router.delete("/DeleteTaskMember", authenticateMiddleware, (req, res) => {
    ProjectController.deleteTaskMember(req, res, db);
  });

  router.delete("/DeleteTaskTag", authenticateMiddleware, (req, res) => {
    ProjectController.deleteTaskTag(req, res, db);
  });

  router.delete("/DeleteTask", authenticateMiddleware, (req, res) => {
    ProjectController.deleteTask(req, res, db);
  });

  router.delete("/DeleteFile", authenticateMiddleware, (req, res) => {
    ProjectController.removeFile(req, res, db);
  });

  router.delete("/DeleteTaskComment", authenticateMiddleware, (req, res) => {
    ProjectController.deleteTaskComment(req, res, db);
  });

  return router;
};

module.exports = projectDELETE;
