// permissionDELETE.js
const express = require("express");
const router = express.Router();
const ProjectController = require("../../Controllers/ProjectController");

const projectDELETE = (db) => {
  router.delete("/RemoveMemberFromProjectById", (req, res) => {
    ProjectController.removeMemberFromProjectById(req, res, db);
  });
  return router;
};

module.exports = projectDELETE;
