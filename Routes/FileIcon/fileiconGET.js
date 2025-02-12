const express = require("express");
const router = express.Router();
const FileiconController = require("../../Controllers/FileiconController");
const authMiddleware = require("../../middlewares/Authentication/Authmiddleware");

const fileiconGET = () => {
  router.get("/GetFileIconByExtension", authMiddleware, (req, res) => {
    FileiconController.getIconByName(req, res);
  });

  return router;
};

module.exports = fileiconGET;
