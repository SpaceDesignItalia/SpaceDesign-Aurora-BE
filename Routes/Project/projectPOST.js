// permissionPOST.js
const express = require("express");
const router = express.Router();
const ProjectController = require("../../Controllers/ProjectController");

const projectPOST = (db) => {
  // Definisci le route GET qui

  router.post("/AddProject", (req, res) => {
    ProjectController.addProject(req, res, db);
  });

  router.post("/AddProjectLink", (req, res) => {
    ProjectController.addProjectLink(req, res, db);
  });

  router.post("/AddProjectTeamMember", (req, res) => {
    ProjectController.addProjectTeamMember(req, res, db);
  });

  router.post("/CreateProjectConversation", (req, res) => {
    ProjectController.createProjectConversation(req, res, db);
  });

  router.post("/UpdateTaskStatus", (req, res) => {
    ProjectController.updateTaskStatus(req, res, db);
  });

  router.post("/AddTaskMember", (req, res) => {
    ProjectController.addTaskMember(req, res, db);
  });

  router.post("/AddTaskTag", (req, res) => {
    ProjectController.addTaskTag(req, res, db);
  });

  return router;
};

module.exports = projectPOST;
