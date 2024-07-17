// controller/PermissionController.js
const Project = require("../Models/ProjectModel");
const path = require("path");
const fs = require("fs");

class ProjectController {
  static async getAllStatus(req, res, db) {
    try {
      const status = await Project.getAllStatus(db);
      res.status(200).json(status);
    } catch (error) {
      console.error("Errore nel recupero degli status:", error);
      res.status(500).send("Recupero degli status fallito");
    }
  }

  static async getAllBanners(req, res, db) {
    try {
      const banners = await Project.getAllBanners(db);
      res.status(200).json(banners);
    } catch (error) {
      console.error("Errore nel recupero dei banners:", error);
      res.status(500).send("Recupero degi banners fallito");
    }
  }

  static async getAllManagers(req, res, db) {
    try {
      const managers = await Project.getAllManagers(db);
      res.status(200).json(managers);
    } catch (error) {
      console.error("Errore nel recupero dei managers:", error);
      res.status(500).send("Recupero dei managers fallito");
    }
  }

  static async getAllProjects(req, res, db) {
    try {
      const projects = await Project.getAllProjects(db);
      res.status(200).json(projects);
    } catch (error) {
      console.error("Errore nel recupero dei progetti:", error);
      res.status(500).send("Recupero dei progetti fallito");
    }
  }

  static async getProjectByIdAndName(req, res, db) {
    try {
      const ProjectId = req.query.ProjectId;
      const ProjectName = req.query.ProjectName;

      const project = await Project.getProjectByIdAndName(
        db,
        ProjectId,
        ProjectName
      );
      res.status(200).json(project);
    } catch (error) {
      console.error("Errore nel recupero del progetto:", error);
      res.status(500).send("Recupero del progetto fallito");
    }
  }

  static async getProjectStatus(req, res, db) {
    try {
      const ProjectId = req.query.ProjectId;

      const StatusId = await Project.getProjectStatus(db, ProjectId);
      res.status(200).json(StatusId);
    } catch (error) {
      console.error("Errore nel recupero dello stato:", error);
      res.status(500).send("Recupero dello stato fallito");
    }
  }

  static async getAllLinkByProjectId(req, res, db) {
    try {
      const ProjectId = req.query.ProjectId;
      const links = await Project.getAllLinkByProjectId(db, ProjectId);
      res.status(200).json(links);
    } catch (error) {
      console.error("Errore nel recupero dei collegamenti:", error);
      res.status(500).send("Recupero dei collegamenti fallito");
    }
  }

  static async getAllLinkTypes(req, res, db) {
    try {
      const linkTypes = await Project.getAllLinkTypes(db);
      res.status(200).json(linkTypes);
    } catch (error) {
      console.error("Errore nel recupero dei tipi di collegamenti:", error);
      res.status(500).send("Recupero dei tipi di collegamenti fallito");
    }
  }

  static async getProjectTeamMembers(req, res, db) {
    try {
      const ProjectId = req.query.ProjectId;

      const members = await Project.getProjectTeamMembers(db, ProjectId);
      res.status(200).json(members);
    } catch (error) {
      console.error("Errore nel recupero dei membri del team:", error);
      res.status(500).send("Recupero dei membri fallito");
    }
  }

  static async getMessagesByConversationId(req, res, db) {
    try {
      const ConversationId = req.query.ConversationId;
      const messages = await Project.getMessagesByConversationId(
        db,
        ConversationId
      );
      res.status(200).json(messages);
    } catch (error) {
      console.error("Errore nel recupero dei messaggi", error);
      res.status(500).send("Recupero dei messaggi fallito");
    }
  }

  static async getMembersNotInProjectTeam(req, res, db) {
    try {
      const ProjectId = req.query.ProjectId;

      const members = await Project.getMembersNotInProjectTeam(db, ProjectId);
      res.status(200).json(members);
    } catch (error) {
      console.error("Errore nel recupero dei membri del team:", error);
      res.status(500).send("Recupero dei membri fallito");
    }
  }

  static async getTaskToDo(req, res, db) {
    try {
      const ProjectId = req.query.ProjectId;
      const tasksNumber = await Project.getTaskToDo(db, ProjectId);
      res.status(200).send(tasksNumber);
    } catch (error) {
      console.error("Errore nel recupero delle task da fare:", error);
      res.status(500).send("Recupero delle task fallito");
    }
  }

  static async addProject(req, res, db) {
    try {
      const ProjectData = req.body.ProjectData;

      const ProjectId = await Project.addProject(db, ProjectData);
      const Conversation = await Project.createProjectConversation(
        db,
        ProjectId
      );
      res.status(200).send(Conversation);
    } catch (error) {
      console.error("Errore nella creazione del progetto:", error);
      res.status(500).send("Creazione del progetto fallito");
    }
  }

  static async createProjectConversation(req, res, db) {
    try {
      const ProjectId = req.body.ProjectId;
      await Project.createProjectConversation(db, ProjectId);
      res.status(200).send("Conversazione creata con successo.");
    } catch (error) {
      console.error("Errore nella creazione della conversazione", error);
      res.status(500).send("Creazione della conversazione fallita");
    }
  }

  static async addProjectLink(req, res, db) {
    try {
      const ProjectLinkData = req.body.ProjectLinkData;

      await Project.addProjectLink(db, ProjectLinkData);
      res.status(200).send("Collegamento creato con successo.");
    } catch (error) {
      console.error("Errore nella creazione del collegamento:", error);
      res.status(500).send("Creazione del progetto fallito");
    }
  }

  static async addProjectTeamMember(req, res, db) {
    try {
      const ProjectMemberId = req.body.ProjectMemberId;
      const ProjectId = req.body.ProjectId;

      await Project.addProjectTeamMember(db, ProjectId, ProjectMemberId);
      res.status(200).send("Membro aggiunto con successo.");
    } catch (error) {
      console.error("Errore nell'aggiunta del membro al progetto:", error);
      res.status(500).send("Aggiunta del membro al progetto fallita");
    }
  }

  static async getConversationByProjectId(req, res, db) {
    try {
      const ProjectId = req.query.ProjectId;

      const conversation = await Project.getConversationByProjectId(
        db,
        ProjectId
      );
      res.status(200).json(conversation);
    } catch (error) {
      console.error("Errore nel recupero della conversazione", error);
      res.status(500).send("Recupero della conversazione fallita");
    }
  }

  static async updateProjectTheme(req, res, db) {
    try {
      const ProjectId = req.body.ProjectId;
      const ProjectBannerId = req.body.ProjectBannerId;

      await Project.updateProjectTheme(db, ProjectId, ProjectBannerId);
      res.status(200).send("Tema del progetto aggiornato con successo.");
    } catch (error) {
      console.error("Errore nell'aggiornamento del tema:", error);
      res.status(500).send("Aggiornamento del tema fallito");
    }
  }

  static async updateProject(req, res, db) {
    try {
      const ProjectData = req.body.ProjectData;

      await Project.updateProject(db, ProjectData);
      res.status(200).send("Progetto aggiornato con successo.");
    } catch (error) {
      console.error("Errore nell'aggiornamento del progetto:", error);
      res.status(500).send("Aggiornamento del progetto fallito");
    }
  }

  static async removeMemberFromProjectById(req, res, db) {
    try {
      const StafferId = req.query.StafferId;
      const ProjectId = req.query.ProjectId;

      await Project.removeMemberFromProjectById(db, StafferId, ProjectId);
      res.status(200).send("Membro eliminato con successo.");
    } catch (error) {
      console.error("Errore nell'eliminazione del membro dal team:", error);
      res.status(500).send("Eliminazione del membro fallita");
    }
  }

  static async removeLinkFromProject(req, res, db) {
    try {
      const ProjectLinkId = req.query.ProjectLinkId;
      const ProjectId = req.query.ProjectId;
      await Project.removeLinkFromProject(db, ProjectLinkId, ProjectId);
      res.status(200).send("Link eliminato con successo.");
    } catch (error) {
      console.error("Errore nell'eliminazione del link:", error);
      res.status(500).send("Eliminazione del link fallita");
    }
  }

  static async deleteProject(req, res, db) {
    try {
      const ProjectId = req.query.ProjectId;

      await Project.deleteProject(db, ProjectId);
      res.status(200).send("Progetto eliminato con successo.");
    } catch (error) {
      console.error("Errore nell'eliminazione del progetto dal team:", error);
      res.status(500).send("Eliminazione del progetto fallita");
    }
  }

  static async getTasksByProjectId(req, res, db) {
    try {
      const ProjectId = req.query.ProjectId;
      const tasks = await Project.getTasksByProjectId(db, ProjectId);
      res.status(200).json(tasks);
    } catch (error) {
      console.error("Errore nel recupero dei task:", error);
      res.status(500).send("Recupero dei task fallito");
    }
  }

  static async getTaskStatuses(req, res, db) {
    try {
      const statuses = await Project.getTaskStatuses(db);
      res.status(200).json(statuses);
    } catch (error) {
      console.error("Errore nel recupero degli status dei task:", error);
      res.status(500).send("Recupero degli status dei task fallito");
    }
  }

  static async updateTaskStatus(req, res, db) {
    try {
      const ProjectTaskId = req.body.ProjectTaskId;
      const ProjectTaskStatusId = req.body.ProjectTaskStatusId;
      await Project.updateTaskStatus(db, ProjectTaskId, ProjectTaskStatusId);
      res.status(200).send("Stato del task aggiornato con successo.");
    } catch (error) {
      console.error("Errore nell'aggiornamento dello stato del task:", error);
      res.status(500).send("Aggiornamento dello stato del task fallito");
    }
  }

  static async getTagsByTaskId(req, res, db) {
    try {
      const ProjectTaskId = req.query.ProjectTaskId;
      const tags = await Project.getTagsByTaskId(db, ProjectTaskId);
      res.status(200).json(tags);
    } catch (error) {
      console.error("Errore nel recupero dei tag del task:", error);
      res.status(500).send("Recupero dei tag del task fallito");
    }
  }

  static async getMembersByTaskId(req, res, db) {
    try {
      const ProjectTaskId = req.query.ProjectTaskId;
      const members = await Project.getMembersByTaskId(db, ProjectTaskId);
      res.status(200).json(members);
    } catch (error) {
      console.error("Errore nel recupero dei membri del task:", error);
      res.status(500).send("Recupero dei membri del task fallito");
    }
  }

  static async getMembersNotInTask(req, res, db) {
    try {
      const TaskData = req.query.TaskData;
      const members = await Project.getMembersNotInTask(db, TaskData);
      res.status(200).json(members);
    } catch (error) {
      console.error("Errore nel recupero dei membri non nel task:", error);
      res.status(500).send("Recupero dei membri non nel task fallito");
    }
  }

  static async getTagsNotInTask(req, res, db) {
    try {
      const TaskData = req.query.TaskData;
      const tags = await Project.getTagsNotInTask(db, TaskData);
      res.status(200).json(tags);
    } catch (error) {
      console.error("Errore nel recupero dei tag non nel task:", error);
      res.status(500).send("Recupero dei tag non nel task fallito");
    }
  }

  static async addTaskMember(req, res, db) {
    try {
      const TaskData = req.body.TaskData;
      const MemberData = req.body.MemberData;
      await Project.addTaskMember(db, TaskData, MemberData);
      res.status(200).send("Membro aggiunto con successo.");
    } catch (error) {
      console.error("Errore nell'aggiunta del membro al task:", error);
      res.status(500).send("Aggiunta del membro al task fallita");
    }
  }

  static async addTaskTag(req, res, db) {
    try {
      const TaskData = req.body.TaskData;
      const TagData = req.body.TagData;
      await Project.addTaskTag(db, TaskData, TagData);
      res.status(200).send("Tag aggiunto con successo.");
    } catch (error) {
      console.error("Errore nell'aggiunta del tag al task:", error);
      res.status(500).send("Aggiunta del tag al task fallita");
    }
  }

  static async getTaskByTaskId(req, res, db) {
    try {
      const ProjectTaskId = req.query.ProjectTaskId;
      const task = await Project.getTaskByTaskId(db, ProjectTaskId);
      res.status(200).json(task);
    } catch (error) {
      console.error("Errore nel recupero del task:", error);
      res.status(500).send("Recupero del task fallito");
    }
  }

  static async deleteTaskMember(req, res, db) {
    try {
      const ProjectTaskId = req.query.ProjectTaskId;
      const StafferId = req.query.StafferId;
      await Project.deleteTaskMember(db, ProjectTaskId, StafferId);
      res.status(200).send("Membro eliminato con successo.");
    } catch (error) {
      console.error("Errore nell'eliminazione del membro dal task:", error);
      res.status(500).send("Eliminazione del membro dal task fallita");
    }
  }

  static async deleteTaskTag(req, res, db) {
    try {
      const ProjectTaskId = req.query.ProjectTaskId;
      const ProjectTaskTagId = req.query.ProjectTaskTagId;
      await Project.deleteTaskTag(db, ProjectTaskId, ProjectTaskTagId);
      res.status(200).send("Tag eliminato con successo.");
    } catch (error) {
      console.error("Errore nell'eliminazione del tag dal task:", error);
      res.status(500).send("Eliminazione del tag dal task fallita");
    }
  }

  static async updateTask(req, res, db) {
    try {
      const TaskData = req.body.TaskData;
      const FormattedDate = req.body.FormattedDate;
      await Project.updateTask(db, TaskData, FormattedDate);
      this.addMemberToTask(TaskData, TaskData.ProjectTaskId, db);
      this.addTagToTask(TaskData, TaskData.ProjectTaskId, db);
      res.status(200).send("Task aggiornato con successo.");
    } catch (error) {
      console.error("Errore nell'aggiornamento del task:", error);
      res.status(500).send("Aggiornamento del task fallito");
    }
  }

  static async getAllTags(req, res, db) {
    try {
      const tags = await Project.getAllTags(db);
      res.status(200).json(tags);
    } catch (error) {
      console.error("Errore nel recupero dei tag:", error);
      res.status(500).send("Recupero dei tag fallito");
    }
  }

  static async searchProjectByName(req, res, db) {
    try {
      const ProjectName = req.query.ProjectName;
      const projects = await Project.searchProjectByName(db, ProjectName);
      res.status(200).json(projects);
    } catch (error) {
      console.error("Errore nel recupero dei progetti:", error);
      res.status(500).send("Recupero dei progetti fallita");
    }
  }

  static async getProjectsByCustomerId(req, res, db) {
    try {
      const CustomerId = req.query.CustomerId;
      const projects = await Project.getProjectsByCustomerId(db, CustomerId);
      res.status(200).json(projects);
    } catch (error) {
      console.error("Errore nel recupero dei progetti:", error);
      res.status(500).send("Recupero dei progetti fallita");
    }
  }

  static async searchProjectsByCustomerIdAndName(req, res, db) {
    try {
      const CustomerId = req.query.CustomerId;
      const ProjectName = req.query.ProjectName;
      const projects = await Project.searchProjectsByCustomerIdAndName(
        db,
        CustomerId,
        ProjectName
      );
      res.status(200).json(projects);
    } catch (error) {
      console.error("Errore nel recupero dei progetti:", error);
      res.status(500).send("Recupero dei progetti fallita");
    }
  }

  static async getProjectInTeam(req, res, db) {
    try {
      const StafferId = req.query.StafferId;
      const projects = await Project.getProjectInTeam(db, StafferId);
      res.status(200).json(projects);
    } catch (error) {
      console.error("Errore nel recupero dei progetti:", error);
      res.status(500).send("Recupero dei progetti fallita");
    }
  }

  static async addTask(req, res, db) {
    try {
      const TaskData = req.body.TaskData;
      const FormattedDate = req.body.FormattedDate;
      const Task = await Project.addTask(db, TaskData, FormattedDate);
      this.addMemberToTask(TaskData, Task.ProjectTaskId, db);
      this.addTagToTask(TaskData, Task.ProjectTaskId, db);
      res.status(200).json(Task.ProjectTaskId);
    } catch (error) {
      console.error("Errore nella creazione del task:", error);
      res.status(500).send("Creazione del task fallita");
    }
  }

  static async addMemberToTask(TaskData, TaskId, db) {
    try {
      await Project.deleteTaskMembers(db, TaskId);
      TaskData.ProjectTaskMembers.map(async (member) => {
        await Project.addMemberToTask(db, TaskId, member.StafferId);
      });
    } catch (error) {
      console.error("Errore nell'aggiunta dei membri al task:", error);
    }
  }

  static async addTagToTask(TaskData, TaskId, db) {
    try {
      await Project.deleteTaskTags(db, TaskId);
      TaskData.ProjectTaskTags.map(async (tag) => {
        await Project.addTagToTask(db, TaskId, tag.ProjectTaskTagId);
      });
    } catch (error) {
      console.error("Errore nell'aggiunta dei tag al task:", error);
    }
  }

  static async deleteTask(req, res, db) {
    try {
      const ProjectTaskId = req.query.ProjectTaskId;
      await Project.deleteTask(db, ProjectTaskId);
      res.status(200).send("Task eliminato con successo.");
    } catch (error) {
      console.error("Errore nell'eliminazione del task:", error);
      res.status(500).send("Eliminazione del task fallita");
    }
  }

  static async uploadFiles(req, res, db) {
    try {
      const files = req.files;
      const { ProjectId, forClient } = req.body;

      const forClientArray = Array.isArray(forClient) ? forClient : [forClient];

      const fileData = files.map((file, index) => ({
        fileName: file.originalname,
        filePath: `/${file.filename}`,
        forClient: forClientArray[index] === "true",
      }));

      await Project.uploadFiles(db, fileData, ProjectId);
      res.status(200).send("Files uploaded successfully.");
    } catch (error) {
      console.error("Error uploading files:", error);
      res.status(500).send("File upload failed");
    }
  }

  static async downloadFile(req, res) {
    try {
      const { filePath, fileName } = req.query;

      console.log("File path:", filePath);
      console.log("File name:", fileName);

      if (!filePath || !fileName) {
        return res.status(400).send("File path and file name are required");
      }

      const fullFilePath = path.join(
        __dirname,
        "../public/uploads/projectFiles",
        filePath
      );

      // Verifica se il file esiste
      if (!fs.existsSync(fullFilePath)) {
        return res.status(404).send("File not found");
      }

      res.download(fullFilePath, fileName, (err) => {
        if (err) {
          console.error("Error downloading file:", err);
          return res.status(500).send("File download failed");
        }
      });
    } catch (error) {
      console.error("Error downloading file:", error);
      res.status(500).send("File download failed");
    }
  }

  static async getFilesByProjectId(req, res, db) {
    try {
      const ProjectId = req.query.ProjectId;

      const files = await Project.getFilesByProjectId(db, ProjectId);
      res.status(200).json(files);
    } catch (error) {
      console.error("Error getting files:", error);
      res.status(500).send("File retrieval failed");
    }
  }
}

module.exports = ProjectController;
