// stafferGET.js
const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const router = express.Router();
const StafferController = require("../../Controllers/StafferController");
const authenticateMiddleware = require("../../middlewares/Authentication/Authmiddleware");

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

const uploadDirCodeShare = "./Files/AttendanceReports";
if (!fs.existsSync(uploadDirCodeShare)) {
  fs.mkdirSync(uploadDirCodeShare, { recursive: true });
}

const attendanceReportStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDirCodeShare);
  },
  filename: function (req, file, cb) {
    const date = new Date();
    const mesi = [
      "Gennaio",
      "Febbraio",
      "Marzo",
      "Aprile",
      "Maggio",
      "Giugno",
      "Luglio",
      "Agosto",
      "Settembre",
      "Ottobre",
      "Novembre",
      "Dicembre",
    ];
    const mese = mesi[date.getMonth()];
    const anno = date.getFullYear();
    const fileName = `presenze_${mese}_${anno}.xlsx`;
    cb(null, fileName);
  },
});

const attendanceReportUpload = multer({ storage: attendanceReportStorage });

const upload = multer({ storage: storage });

const stafferPOST = (db) => {
  // Definisci le route POST qui
  router.post("/AddStaffer", authenticateMiddleware, (req, res) => {
    StafferController.addNewStaffer(req, res, db);
  });

  router.post("/AddAttendanceEmail", authenticateMiddleware, (req, res) => {
    StafferController.addAttendanceEmail(req, res, db);
  });

  router.post("/SendAttendanceReport", authenticateMiddleware, (req, res) => {
    StafferController.sendAttendanceReport(req, res, db);
  });

  router.post(
    "/UploadAttendanceExcel",
    authenticateMiddleware,
    attendanceReportUpload.single("file"),
    (req, res) => {
      StafferController.uploadAttendanceExcel(req, res, db);
    }
  );

  return router; // Ritorna il router per consentire l'utilizzo da parte dell'app principale
};

module.exports = stafferPOST;
