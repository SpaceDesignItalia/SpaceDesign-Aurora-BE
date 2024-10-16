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

  static async getMessagesCustomerByConversationId(req, res, db) {
    try {
      const ConversationId = req.query.ConversationId;
      const messages = await Project.getMessagesCustomerByConversationId(
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
      res.status(200).json(tasksNumber);
    } catch (error) {
      console.error("Errore nel recupero delle task da fare:", error);
      res.status(500).send("Recupero delle task fallito");
    }
  }

  static async getTotalTasks(req, res, db) {
    try {
      const ProjectId = req.query.ProjectId;
      const totalTasks = await Project.getTotalTasks(db, ProjectId);
      res.status(200).json(totalTasks);
    } catch (error) {
      console.error("Errore nel recupero delle tasks:", error);
      res.status(500).send("Recupero delle tasks fallito");
    }
  }

  static async getTotalTeamMembers(req, res, db) {
    try {
      const ProjectId = req.query.ProjectId;
      const totalTeamMembers = await Project.getTotalTeamMembers(db, ProjectId);
      res.status(200).json(totalTeamMembers);
    } catch (error) {
      console.error("Errore nel recupero delle tasks:", error);
      res.status(500).send("Recupero delle tasks fallito");
    }
  }

  static async addProject(req, res, db) {
    try {
      const ProjectData = req.body.ProjectData;

      const ProjectId = await Project.addProject(db, ProjectData);
      const ProjectManagerId = ProjectData.ProjectManagerId;
      const CompanyId = ProjectData.CompanyId;
      const Conversation = await Project.createProjectConversation(
        db,
        ProjectId,
        ProjectManagerId,
        CompanyId
      );
      res.status(200).send(Conversation);
    } catch (error) {
      console.error("Errore nella creazione del progetto:", error);
      res.status(500).send("Creazione del progetto fallito");
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

  static async getCommentsByTaskId(req, res, db) {
    try {
      const ProjectTaskId = req.query.ProjectTaskId;
      const comments = await Project.getCommentsByTaskId(db, ProjectTaskId);
      res.status(200).json(comments);
    } catch (error) {
      console.error("Errore nel recupero dei commenti del task:", error);
      res.status(500).send("Recupero dei commenti del task fallito");
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
      const FormattedCreationDate = req.body.FormattedCreationDate;
      await Project.updateTask(
        db,
        TaskData,
        FormattedDate,
        FormattedCreationDate
      );
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
      const CustomerId = req.session.account.CustomerId;
      const projects = await Project.getProjectsByCustomerId(db, CustomerId);
      res.status(200).json(projects);
    } catch (error) {
      console.error("Errore nel recupero dei progetti:", error);
      res.status(500).send("Recupero dei progetti fallita");
    }
  }

  static async searchProjectsByCustomerIdAndName(req, res, db) {
    try {
      const CustomerId = req.session.account.CustomerId;
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
      const StafferId = req.session.account.StafferId;
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
      const FormattedCreationDate = req.body.FormattedCreationDate;
      const Task = await Project.addTask(
        db,
        TaskData,
        FormattedDate,
        FormattedCreationDate
      );
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

  static async uploadTaskFiles(req, res, db) {
    try {
      const files = req.files;
      const { TaskId } = req.body;

      console.log("Files:", files);
      const fileData = files.map((file, index) => ({
        fileName: file.originalname,
        filePath: `/${file.filename}`,
      }));

      await Project.uploadTaskFiles(db, fileData, TaskId);
      res.status(200).send("Files uploaded successfully.");
    } catch (error) {
      console.error("Error uploading files:", error);
      res.status(500).send("File upload failed");
    }
  }

  static async removeFile(req, res, db) {
    try {
      const { ProjectId, FilePath } = req.query;

      const fullFilePath = path.join(
        __dirname,
        "../public/uploads/projectFiles",
        FilePath
      );

      fs.unlink(fullFilePath, (err) => {
        if (err) {
          console.error("Error deleting file:", err);
          return res.status(500).send("Error deleting file");
        }
      });

      await Project.removeFile(db, FilePath, ProjectId);
      res.status(200).send("File rimosso con successo.");
    } catch (error) {
      console.error("Error uploading files:", error);
      res.status(500).send("File upload failed");
    }
  }

  static async downloadFile(req, res) {
    try {
      const { filePath, fileName } = req.query;

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

  static async getFilesByTaskId(req, res, db) {
    try {
      const TaskId = req.query.TaskId;

      const files = await Project.getFilesByTaskId(db, TaskId);
      res.status(200).json(files);
    } catch (error) {
      console.error("Error getting files:", error);
      res.status(500).send("File retrieval failed");
    }
  }

  static async getFilesByProjectIdForCustomer(req, res, db) {
    try {
      const ProjectId = req.query.ProjectId;

      const files = await Project.getFilesByProjectIdForCustomer(db, ProjectId);
      res.status(200).json(files);
    } catch (error) {
      console.error("Error getting files:", error);
      res.status(500).send("File retrieval failed");
    }
  }

  static async searchFilesByProjectIdAndName(req, res, db) {
    try {
      const FileName = req.query.FileName;
      const ProjectId = req.query.ProjectId;

      const files = await Project.searchFilesByProjectIdAndName(
        db,
        FileName,
        ProjectId
      );
      res.status(200).json(files);
    } catch (error) {
      console.error("Error getting files:", error);
      res.status(500).send("File retrieval failed");
    }
  }

  static async searchFilesByProjectIdAndNameForCustomer(req, res, db) {
    try {
      const FileName = req.query.FileName;
      const ProjectId = req.query.ProjectId;

      const files = await Project.searchFilesByProjectIdAndName(
        db,
        FileName,
        ProjectId
      );
      res.status(200).json(files);
    } catch (error) {
      console.error("Error getting files:", error);
      res.status(500).send("File retrieval failed");
    }
  }

  static async addTaskComment(req, res, db) {
    try {
      const Comment = req.body.Comment;
      const TaskId = req.body.TaskId;
      const StafferId = req.session.account.StafferId;

      await Project.addTaskComment(db, Comment, TaskId, StafferId);
      res.status(200).send("Commento aggiunto con successo.");
    } catch (error) {
      console.error("Error adding comment:", error);
      res.status(500).send("Comment addition failed");
    }
  }

  static async deleteTaskComment(req, res, db) {
    try {
      const CommentId = req.body.CommentId;
      await Project.deleteTaskComment(db, CommentId);
      res.status(200).send("Commento eliminato con successo.");
    } catch (error) {
      console.error("Error deleting comment:", error);
      res.status(500).send("Comment deletion failed");
    }
  }

  static async addTaskCheckbox(req, res, db) {
    try {
      const CheckboxText = req.body.CheckboxText;
      const ChecklistId = req.body.ChecklistId;

      await Project.addTaskCheckbox(db, CheckboxText, ChecklistId);
      res.status(200).send("Checkbox aggiunto con successo.");
    } catch (error) {
      console.error("Error adding checkbox:", error);
      res.status(500).send("Checkbox addition failed");
    }
  }

  static async getCheckboxesByChecklistId(req, res, db) {
    try {
      const ChecklistId = req.query.ChecklistId;
      const checkboxes = await Project.getCheckboxesByChecklistId(
        db,
        ChecklistId
      );
      res.status(200).json(checkboxes);
    } catch (error) {
      console.error("Error getting checkboxes:", error);
      res.status(500).send("Checkbox retrieval failed");
    }
  }

  static async updateCheckboxStatus(req, res, db) {
    try {
      const CheckboxId = req.body.CheckboxId;
      const isSelected = req.body.isSelected;

      await Project.updateCheckboxStatus(db, CheckboxId, isSelected);
      res.status(200).send("Stato della checkbox aggiornato con successo.");
    } catch (error) {
      console.error("Error updating checkbox status:", error);
      res.status(500).send("Checkbox status update failed");
    }
  }

  static async getChecklistsByTaskId(req, res, db) {
    try {
      const TaskId = req.query.TaskId;
      const checklists = await Project.getChecklistsByTaskId(db, TaskId);
      res.status(200).json(checklists);
    } catch (error) {
      console.error("Error getting checklists:", error);
      res.status(500).send("Checklist retrieval failed");
    }
  }

  static async addTaskChecklist(req, res, db) {
    try {
      const ChecklistText = req.body.ChecklistText;
      const TaskId = req.body.TaskId;

      await Project.addTaskChecklist(db, ChecklistText, TaskId);
      res.status(200).send("Checklist aggiunta con successo.");
    } catch (error) {
      console.error("Error adding checklist:", error);
      res.status(500).send("Checklist addition failed");
    }
  }

  static async deleteTaskChecklist(req, res, db) {
    try {
      const ChecklistId = req.body.ChecklistId;
      await Project.deleteTaskChecklist(db, ChecklistId);
      res.status(200).send("Checklist eliminata con successo.");
    } catch (error) {
      console.error("Error deleting checklist:", error);
      res.status(500).send("Checklist deletion failed");
    }
  }

  static async deleteTaskCheckbox(req, res, db) {
    try {
      const CheckboxId = req.body.CheckboxId;
      await Project.deleteTaskCheckbox(db, CheckboxId);
      res.status(200).send("Checkbox eliminata con successo.");
    } catch (error) {
      console.error("Error deleting checkbox:", error);
      res.status(500).send("Checkbox deletion failed");
    }
  }

  static async updateCheckboxText(req, res, db) {
    try {
      const CheckboxId = req.body.CheckboxId;
      const CheckboxText = req.body.CheckboxText;

      await Project.updateCheckboxText(db, CheckboxId, CheckboxText);
      res.status(200).send("Testo della checkbox aggiornato con successo.");
    } catch (error) {
      console.error("Error updating checkbox text:", error);
      res.status(500).send("Checkbox text update failed");
    }
  }

  static async updateComment(req, res, db) {
    try {
      const CommentId = req.body.CommentId;
      const CommentText = req.body.CommentText;

      await Project.updateComment(db, CommentId, CommentText);
      res.status(200).send("Commento aggiornato con successo.");
    } catch (error) {
      console.error("Error updating comment:", error);
      res.status(500).send("Comment update failed");
    }
  }
}

module.exports = ProjectController;
