const express = require("express");
const router = express.Router();
const CalendarController = require("../../Controllers/CalendarController");
const authenticateMiddleware = require("../../middlewares/Authentication/Authmiddleware");
const fs = require("fs");
const multer = require("multer");
const path = require("path");

// Ensure the upload directory exists
const uploadDir = "./public/uploads/calendarFiles";
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

const calendarPOST = (db) => {
  router.post("/AddEvent", authenticateMiddleware, (req, res) => {
    CalendarController.addEvent(req, res, db);
  });

  router.post(
    "/UploadEventAttachment",
    authenticateMiddleware,
    upload.array("files"),
    (req, res) => {
      CalendarController.uploadEventAttachment(req, res, db);
    }
  );
  return router;
};

module.exports = calendarPOST;
