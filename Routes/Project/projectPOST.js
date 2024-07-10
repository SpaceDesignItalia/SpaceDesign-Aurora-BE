const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const router = express.Router();
const ProjectController = require("../../Controllers/ProjectController");

// Ensure the upload directory exists
const uploadDir = "./public/uploads/projectFiles";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure multer storage to retain the original file extension
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix + ext);
  },
});

const projectPOST = (db) => {
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

  router.post("/AddTask", (req, res) => {
    ProjectController.addTask(req, res, db);
  });

  const upload = multer({ storage: storage });

  router.post("/UploadFile", upload.array("files"), (req, res) => {
    ProjectController.uploadFiles(req, res, db);
  });

  return router;
};

module.exports = projectPOST;
