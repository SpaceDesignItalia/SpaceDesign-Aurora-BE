// stafferGET.js
const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const router = express.Router();
const CustomerController = require("../../Controllers/CustomerController");

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

const customerUPDATE = (db) => {
  // Definisci le route GET qui

  router.put("/UpdateCustomerData", (req, res) => {
    CustomerController.updateCustomerData(req, res, db);
  });

  router.put(
    "/SettingsUpdateCustomerData",
    upload.single("file"),
    (req, res) => {
      CustomerController.settingsUpdateCustomerData(req, res, db);
    }
  );

  router.put("/UpdateCustomerPassword", (req, res) => {
    CustomerController.updateCustomerPassword(req, res, db);
  });

  return router; // Ritorna il router per consentire l'utilizzo da parte dell'app principale
};

module.exports = customerUPDATE;
