// permissionDELETE.js
const express = require("express");
const router = express.Router();
const ProjectController = require("../../Controllers/ProjectController");

const projectDELETE = (db) => {
  router.delete("/RemoveMemberFromProjectById", (req, res) => {
    ProjectController.removeMemberFromProjectById(req, res, db);
  });

  router.delete("/RemoveLinkFromProject", (req, res) => {
    ProjectController.removeLinkFromProject(req, res, db);
  });

  router.delete("/DeleteProject", (req, res) => {
    ProjectController.deleteProject(req, res, db);
  });
<<<<<<< HEAD

  router.delete("/DeleteTaskMember", (req, res) => {
    ProjectController.deleteTaskMember(req, res, db);
  });

  router.delete("/DeleteTaskTag", (req, res) => {
    ProjectController.deleteTaskTag(req, res, db);
  });

  router.delete("/DeleteTask", (req, res) => {
    ProjectController.deleteTask(req, res, db);
  });

=======
>>>>>>> 99208fd32ed173e24295e68837f2c0b1bcfc7f65
  return router;
};

module.exports = projectDELETE;
