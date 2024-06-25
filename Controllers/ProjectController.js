// controller/PermissionController.js
const Project = require("../Models/ProjectModel");

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
}

module.exports = ProjectController;
