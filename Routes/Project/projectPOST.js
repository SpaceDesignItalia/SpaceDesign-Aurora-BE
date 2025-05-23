const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const router = express.Router();
const ProjectController = require("../../Controllers/ProjectController");
const authenticateMiddleware = require("../../middlewares/Authentication/Authmiddleware");

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

const uploadDirCodeShare = "./public/codeShare";
if (!fs.existsSync(uploadDirCodeShare)) {
  fs.mkdirSync(uploadDirCodeShare, { recursive: true });
}

const codeShareStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDirCodeShare);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix + ext);
  },
});

const codeShareUpload = multer({ storage: codeShareStorage });

const upload = multer({ storage: storage });

const projectPOST = (db) => {
  router.post("/AddProject", authenticateMiddleware, (req, res) => {
    ProjectController.addProject(req, res, db);
  });

  router.post("/AddProjectLink", authenticateMiddleware, (req, res) => {
    ProjectController.addProjectLink(req, res, db);
  });

  router.post("/AddProjectTeamMember", authenticateMiddleware, (req, res) => {
    ProjectController.addProjectTeamMember(req, res, db);
  });

  router.post(
    "/CreateProjectConversation",
    authenticateMiddleware,
    (req, res) => {
      ProjectController.createProjectConversation(req, res, db);
    }
  );

  router.post("/UpdateTaskStatus", authenticateMiddleware, (req, res) => {
    ProjectController.updateTaskStatus(req, res, db);
  });

  router.post("/AddTaskMember", authenticateMiddleware, (req, res) => {
    ProjectController.addTaskMember(req, res, db);
  });

  router.post("/AddTaskTag", authenticateMiddleware, (req, res) => {
    ProjectController.addTaskTag(req, res, db);
  });

  router.post("/AddTask", authenticateMiddleware, (req, res) => {
    ProjectController.addTask(req, res, db);
  });

  router.post("/UploadFile", upload.array("files"), (req, res) => {
    ProjectController.uploadFiles(req, res, db);
  });

  router.post("/UploadTaskFile", upload.array("files"), (req, res) => {
    ProjectController.uploadTaskFiles(req, res, db);
  });

  router.post("/AddTaskComment", authenticateMiddleware, (req, res) => {
    ProjectController.addTaskComment(req, res, db);
  });

  router.post("/AddTaskCheckbox", authenticateMiddleware, (req, res) => {
    ProjectController.addTaskCheckbox(req, res, db);
  });

  router.post("/AddTaskChecklist", authenticateMiddleware, (req, res) => {
    ProjectController.addTaskChecklist(req, res, db);
  });

  router.post("/AddFolder", authenticateMiddleware, (req, res) => {
    ProjectController.addFolder(req, res, db);
  });

  router.post("/RefineText", authenticateMiddleware, (req, res) => {
    ProjectController.refineText(req, res);
  });

  router.post(
    "/RefineProjectDescription",
    authenticateMiddleware,
    (req, res) => {
      ProjectController.refineProjectDescription(req, res);
    }
  );

  router.post("/RefineRoleDescription", authenticateMiddleware, (req, res) => {
    ProjectController.refineRoleDescription(req, res);
  });

  router.post(
    "/GenerateRoleDescriptionFromName",
    authenticateMiddleware,
    (req, res) => {
      ProjectController.generateRoleDescription(req, res);
    }
  );

  router.post("/RefineEventDescription", authenticateMiddleware, (req, res) => {
    ProjectController.refineEventDescription(req, res);
  });

  router.post("/UpdateProjectCode", authenticateMiddleware, (req, res) => {
    ProjectController.updateProjectCode(req, res, db);
  });

  router.post("/AddCodeShareTab", authenticateMiddleware, (req, res) => {
    ProjectController.addCodeShareTab(req, res, db);
  });

  router.post(
    "/UploadCodeShareScreenshot",
    codeShareUpload.single("file"),
    (req, res) => {
      ProjectController.uploadCodeShareScreenshot(req, res, db);
    }
  );

  router.post("/UpdateTaskStatusName", authenticateMiddleware, (req, res) => {
    ProjectController.updateTaskStatusName(req, res, db);
  });

  router.post("/AddTaskStatus", authenticateMiddleware, (req, res) => {
    ProjectController.addTaskStatus(req, res, db);
  });

  return router;
};

module.exports = projectPOST;
