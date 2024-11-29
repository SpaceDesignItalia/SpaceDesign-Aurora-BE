// permissionGET.js
const express = require("express");
const router = express.Router();
const ProjectController = require("../../Controllers/ProjectController");
const authenticateMiddleware = require("../../middlewares/EmailService/Authentication/Authmiddleware");

const projectGET = (db) => {
  // Definisci le route GET qui

  router.get("/GetAllStatus", authenticateMiddleware, (req, res) => {
    ProjectController.getAllStatus(req, res, db);
  });

  router.get("/GetAllBanners", authenticateMiddleware, (req, res) => {
    ProjectController.getAllBanners(req, res, db);
  });

  router.get("/GetAllManagers", authenticateMiddleware, (req, res) => {
    ProjectController.getAllManagers(req, res, db);
  });

  router.get("/GetAllProjects", authenticateMiddleware, (req, res) => {
    ProjectController.getAllProjects(req, res, db);
  });

  router.get("/GetAllProjectsTable", authenticateMiddleware, (req, res) => {
    ProjectController.getAllProjectsTable(req, res, db);
  });

  router.get("/GetProjectByIdAndName", authenticateMiddleware, (req, res) => {
    ProjectController.getProjectByIdAndName(req, res, db);
  });

  router.get("/GetProjectStatus", authenticateMiddleware, (req, res) => {
    ProjectController.getProjectStatus(req, res, db);
  });

  router.get("/GetAllLinkByProjectId", authenticateMiddleware, (req, res) => {
    ProjectController.getAllLinkByProjectId(req, res, db);
  });

  router.get("/GetAllLinkType", authenticateMiddleware, (req, res) => {
    ProjectController.getAllLinkTypes(req, res, db);
  });

  router.get(
    "/GetConversationByProjectId",
    authenticateMiddleware,
    (req, res) => {
      ProjectController.getConversationByProjectId(req, res, db);
    }
  );

  router.get(
    "/GetMessagesByConversationId",
    authenticateMiddleware,
    (req, res) => {
      ProjectController.getMessagesByConversationId(req, res, db);
    }
  );

  router.get(
    "/GetMessagesCustomerByConversationId",
    authenticateMiddleware,
    (req, res) => {
      ProjectController.getMessagesCustomerByConversationId(req, res, db);
    }
  );

  router.get("/GetProjetTeamMembers", authenticateMiddleware, (req, res) => {
    ProjectController.getProjectTeamMembers(req, res, db);
  });

  router.get(
    "/GetMembersNotInProjectTeam",
    authenticateMiddleware,
    (req, res) => {
      ProjectController.getMembersNotInProjectTeam(req, res, db);
    }
  );

  router.get("/GetTaskToDo", authenticateMiddleware, (req, res) => {
    ProjectController.getTaskToDo(req, res, db);
  });

  router.get("/GetTotalTasks", authenticateMiddleware, (req, res) => {
    ProjectController.getTotalTasks(req, res, db);
  });

  router.get("/GetTotalTeamMembers", authenticateMiddleware, (req, res) => {
    ProjectController.getTotalTeamMembers(req, res, db);
  });

  router.get("/GetTasksByProjectId", authenticateMiddleware, (req, res) => {
    ProjectController.getTasksByProjectId(req, res, db);
  });

  router.get("/GetTaskStatuses", authenticateMiddleware, (req, res) => {
    ProjectController.getTaskStatuses(req, res, db);
  });

  router.get("/GetTagsByTaskId", authenticateMiddleware, (req, res) => {
    ProjectController.getTagsByTaskId(req, res, db);
  });

  router.get("/GetMembersByTaskId", authenticateMiddleware, (req, res) => {
    ProjectController.getMembersByTaskId(req, res, db);
  });

  router.get("/GetCommentsByTaskId", authenticateMiddleware, (req, res) => {
    ProjectController.getCommentsByTaskId(req, res, db);
  });

  router.get("/GetMembersNotInTask", authenticateMiddleware, (req, res) => {
    ProjectController.getMembersNotInTask(req, res, db);
  });

  router.get("/GetTagsNotInTask", authenticateMiddleware, (req, res) => {
    ProjectController.getTagsNotInTask(req, res, db);
  });

  router.get("/GetTaskByTaskId", authenticateMiddleware, (req, res) => {
    ProjectController.getTaskByTaskId(req, res, db);
  });

  router.get("/GetAllTags", authenticateMiddleware, (req, res) => {
    ProjectController.getAllTags(req, res, db);
  });

  router.get("/GetProjectInTeam", authenticateMiddleware, (req, res) => {
    ProjectController.getProjectInTeam(req, res, db);
  });

  router.get("/SearchProjectByName", authenticateMiddleware, (req, res) => {
    ProjectController.searchProjectByName(req, res, db);
  });

  router.get(
    "/SearchProjectByNameTable",
    authenticateMiddleware,
    (req, res) => {
      ProjectController.searchProjectByNameTable(req, res, db);
    }
  );

  router.get("/GetFoldersByUpFolderId", authenticateMiddleware, (req, res) => {
    ProjectController.getFoldersByUpFolderId(req, res, db);
  });

  router.get("/GetFilesByFolderId", authenticateMiddleware, (req, res) => {
    ProjectController.getFilesByFolderId(req, res, db);
  });

  router.get("/GetFilesByTaskId", authenticateMiddleware, (req, res) => {
    ProjectController.getFilesByTaskId(req, res, db);
  });

  router.get(
    "/GetFoldersByUpFolderIdForCustomer",
    authenticateMiddleware,
    (req, res) => {
      ProjectController.getFoldersByUpFolderIdForCustomer(req, res, db);
    }
  );

  router.get(
    "/GetFilesByFolderIdForCustomer",
    authenticateMiddleware,
    (req, res) => {
      ProjectController.getFilesByFolderIdForCustomer(req, res, db);
    }
  );

  router.get("/GetProjectsByCustomerId", authenticateMiddleware, (req, res) => {
    ProjectController.getProjectsByCustomerId(req, res, db);
  });

  router.get(
    "/SearchProjectByCustomerIdAndName",
    authenticateMiddleware,
    (req, res) => {
      ProjectController.searchProjectsByCustomerIdAndName(req, res, db);
    }
  );

  router.get(
    "/SearchFolderByProjectIdAndName",
    authenticateMiddleware,
    (req, res) => {
      ProjectController.searchFolderByProjectIdAndName(req, res, db);
    }
  );

  router.get(
    "/SearchFilesByFolderIdAndName",
    authenticateMiddleware,
    (req, res) => {
      ProjectController.searchFilesByFolderIdAndName(req, res, db);
    }
  );

  router.get(
    "/SearchFilesByProjectIdAndNameForCustomer",
    authenticateMiddleware,
    (req, res) => {
      ProjectController.searchFilesByProjectIdAndNameForCustomer(req, res, db);
    }
  );

  router.get(
    "/DownloadProjectFileByPath",
    authenticateMiddleware,
    (req, res) => {
      ProjectController.downloadFile(req, res);
    }
  );

  router.get(
    "/GetCheckboxesByChecklistId",
    authenticateMiddleware,
    (req, res) => {
      ProjectController.getCheckboxesByChecklistId(req, res, db);
    }
  );

  router.get("/GetChecklistsByTaskId", authenticateMiddleware, (req, res) => {
    ProjectController.getChecklistsByTaskId(req, res, db);
  });

  router.get("/GetFolderInfoByFolderId", authenticateMiddleware, (req, res) => {
    ProjectController.getFolderInfoByFolderId(req, res, db);
  });

  router.get("/GetDefaultProjectFolder", authenticateMiddleware, (req, res) => {
    ProjectController.getDefaultProjectFolder(req, res, db);
  });

  router.get(
    "/GetDefaultFilesByFolderId",
    authenticateMiddleware,
    (req, res) => {
      ProjectController.getDefaultFilesByFolderId(req, res, db);
    }
  );

  router.get("/GetFolderByFolderId", authenticateMiddleware, (req, res) => {
    ProjectController.getFolderByFolderId(req, res, db);
  });

  router.get("/GetProjectByUniqueCode", authenticateMiddleware, (req, res) => {
    ProjectController.getProjectByUniqueCode(req, res, db);
  });

  return router; // Ritorna il router per consentire l'utilizzo da parte dell'app principale
};

module.exports = projectGET;
