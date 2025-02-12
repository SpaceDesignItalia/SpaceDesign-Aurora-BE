// stafferGET.js
const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const router = express.Router();
const StafferController = require("../../Controllers/StafferController");
const authenticateMiddleware = require("../../middlewares/Authentication/Authmiddleware");

// Ensure the upload directory exists
const uploadDir = "./public/profileIcons";
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

const upload = multer({ storage: storage });

const stafferUPDATE = (db) => {
  // Definisci le route UPDATE qui

  router.put(
    "/UpdateStaffer",
    authenticateMiddleware,
    upload.single("files"),
    (req, res) => {
      StafferController.updateStaffer(req, res, db);
    }
  );

  router.put(
    "/SettingsUpdateStaffer",
    authenticateMiddleware,
    upload.single("file"),
    (req, res) => {
      StafferController.settingsUpdateStaffer(req, res, db);
    }
  );

  router.put("/UpdateStafferPassword", authenticateMiddleware, (req, res) => {
    StafferController.updateStafferPassword(req, res, db);
  });

  router.put("/UpdateStafferAttendance", authenticateMiddleware, (req, res) => {
    StafferController.updateStafferAttendance(req, res, db);
  });

  return router; // Ritorna il router per consentire l'utilizzo da parte dell'app principale
};

module.exports = stafferUPDATE;
