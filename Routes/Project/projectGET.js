// permissionGET.js
const express = require("express");
const router = express.Router();
const ProjectController = require("../../Controllers/ProjectController");

const projectGET = (db) => {
  // Definisci le route GET qui

  router.get("/GetAllStatus", (req, res) => {
    ProjectController.getAllStatus(req, res, db);
  });

  router.get("/GetAllBanners", (req, res) => {
    ProjectController.getAllBanners(req, res, db);
  });

  router.get("/GetAllManagers", (req, res) => {
    ProjectController.getAllManagers(req, res, db);
  });

  router.get("/GetAllProjects", (req, res) => {
    ProjectController.getAllProjects(req, res, db);
  });

  router.get("/GetProjectByIdAndName", (req, res) => {
    ProjectController.getProjectByIdAndName(req, res, db);
  });

  router.get("/GetProjectStatus", (req, res) => {
    ProjectController.getProjectStatus(req, res, db);
  });

  router.get("/GetAllLinkByProjectId", (req, res) => {
    ProjectController.getAllLinkByProjectId(req, res, db);
  });

  router.get("/GetAllLinkType", (req, res) => {
    ProjectController.getAllLinkTypes(req, res, db);
  });

  router.get("/GetConversationByProjectId", (req, res) => {
    ProjectController.getConversationByProjectId(req, res, db);
  });

  router.get("/GetMessagesByConversationId", (req, res) => {
    ProjectController.getMessagesByConversationId(req, res, db);
  });

  router.get("/GetProjetTeamMembers", (req, res) => {
    ProjectController.getProjectTeamMembers(req, res, db);
  });

  router.get("/GetMembersNotInProjectTeam", (req, res) => {
    ProjectController.getMembersNotInProjectTeam(req, res, db);
  });

  router.get("/GetTaskToDo", (req, res) => {
    ProjectController.getTaskToDo(req, res, db);
  });

  router.get("/GetTasksByProjectId", (req, res) => {
    ProjectController.getTasksByProjectId(req, res, db);
  });

  router.get("/GetTaskStatuses", (req, res) => {
    ProjectController.getTaskStatuses(req, res, db);
  });

  router.get("/GetTagsByTaskId", (req, res) => {
    ProjectController.getTagsByTaskId(req, res, db);
  });

  router.get("/GetMembersByTaskId", (req, res) => {
    ProjectController.getMembersByTaskId(req, res, db);
  });

  router.get("/GetMembersNotInTask", (req, res) => {
    ProjectController.getMembersNotInTask(req, res, db);
  });

  router.get("/GetTagsNotInTask", (req, res) => {
    ProjectController.getTagsNotInTask(req, res, db);
  });

  router.get("/GetTaskByTaskId", (req, res) => {
    ProjectController.getTaskByTaskId(req, res, db);
  });

  router.get("/GetAllTags", (req, res) => {
    ProjectController.getAllTags(req, res, db);
  });

  router.get("/GetProjectInTeam", (req, res) => {
    ProjectController.getProjectInTeam(req, res, db);
  });

  router.get("/SearchProjectByName", (req, res) => {
    ProjectController.searchProjectByName(req, res, db);
  });

  router.get("/GetFilesByProjectId", (req, res) => {
    ProjectController.getFilesByProjectId(req, res, db);
  });

  router.get("/GetProjectsByCustomerId", (req, res) => {
    ProjectController.getProjectsByCustomerId(req, res, db);
  });

  router.get("/SearchProjectByCustomerIdAndName", (req, res) => {
    ProjectController.searchProjectsByCustomerIdAndName(req, res, db);
  });

  router.get("/DownloadProjectFileByPath", (req, res) => {
    ProjectController.downloadFile(req, res);
  });

  return router; // Ritorna il router per consentire l'utilizzo da parte dell'app principale
};

module.exports = projectGET;
