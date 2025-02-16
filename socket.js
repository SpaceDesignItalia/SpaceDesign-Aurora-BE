// socketServer.js
const { Server } = require("socket.io");

let onlineUsers = [];
let onlineUsersOnCodeShare = [];
const videoRoomParticipants = {}; // Track participants per project room
const videoWindows = new Map(); // Track video windows by userId and projectId

function handleUserLeaveVideo(projectId, userId, io) {
  if (videoRoomParticipants[projectId]) {
    videoRoomParticipants[projectId].delete(userId);
    if (videoRoomParticipants[projectId].size === 0) {
      delete videoRoomParticipants[projectId];
    }
    io.emit("video-participants-update", {
      projectId: projectId,
      count: videoRoomParticipants[projectId]?.size || 0,
      participants: videoRoomParticipants[projectId]
        ? Array.from(videoRoomParticipants[projectId])
        : [],
    });
  }
}

function createSocketServer(httpServer) {
  const io = new Server(httpServer, {
    cors: {
      origin: [
        "http://localhost:5173",
        "http://localhost:5174",
        "https://app.spacedesign-italia.it",
      ],
      methods: ["GET", "POST"],
      credentials: true,
    },
    pingTimeout: 5000,
    pingInterval: 2000,
  });

  io.on("connection", (socket) => {
    // Invia lo stato iniziale delle stanze video
    socket.emit("initial-video-participants", videoRoomParticipants);

    socket.on("join", (conversationId) => {
      socket.join(conversationId);
    });

    socket.on("message", (conversationId) => {
      io.to(conversationId).emit("message-update", conversationId);
    });

    socket.on("task-news", (ProjectId) => {
      io.to(ProjectId).emit("task-update", ProjectId);
    });

    socket.on("file-update", (ProjectId) => {
      io.emit("file-update", ProjectId);
    });

    socket.on("join-notifications", (userId) => {
      socket.join(userId);
    });

    socket.on("delete-notifications", (userId) => {
      io.to(userId).emit("delete-notifications");
    });

    socket.on("join-video-room", (projectId, userId) => {
      if (!videoRoomParticipants[projectId]) {
        videoRoomParticipants[projectId] = new Set();
      }
      videoRoomParticipants[projectId].add(userId);
      videoWindows.set(socket.id, { userId, projectId });
      io.emit("video-participants-update", {
        projectId: projectId,
        count: videoRoomParticipants[projectId].size,
        participants: Array.from(videoRoomParticipants[projectId]),
      });
    });

    socket.on("leave-video-room", (projectId, userId) => {
      handleUserLeaveVideo(projectId, userId, io);
      videoWindows.delete(socket.id);
    });

    socket.on("check-video-room", (projectId) => {
      const count = videoRoomParticipants[projectId]?.size || 0;
      const participants = videoRoomParticipants[projectId]
        ? Array.from(videoRoomParticipants[projectId])
        : [];
      socket.emit("video-participants-update", {
        projectId: projectId,
        count: count,
        participants: participants,
      });
    });

    socket.on("ping-video-presence", (projectId, userId) => {
      if (videoWindows.has(socket.id)) {
        videoWindows.get(socket.id).lastPing = Date.now();
      }
    });

    socket.on("new-user-add", (newUserId) => {
      if (!onlineUsers.some((user) => user.userId === newUserId)) {
        onlineUsers.push({
          userId: newUserId,
          status: "online",
          socketId: socket.id,
        });
      }
      io.emit("get-users", onlineUsers);
    });

    socket.on("disconnect", () => {
      const videoSession = videoWindows.get(socket.id);
      if (videoSession) {
        const { projectId, userId } = videoSession;
        handleUserLeaveVideo(projectId, userId, io);
        videoWindows.delete(socket.id);
      }
      onlineUsers = onlineUsers.filter((user) => user.socketId !== socket.id);
      onlineUsersOnCodeShare = onlineUsersOnCodeShare.filter(
        (user) => user.socketId !== socket.id
      );
      io.emit("get-users", onlineUsers);
      io.emit("get-users-on-code-share", onlineUsersOnCodeShare);
    });

    socket.on("offline", () => {
      onlineUsers = onlineUsers.map((user) =>
        user.socketId === socket.id ? { ...user, status: "offline" } : user
      );
      io.emit("get-users", onlineUsers);
    });

    socket.on("get-users", () => {
      io.emit("get-users", onlineUsers);
    });

    socket.on("share-code-update", () => {
      io.emit("share-code-update");
    });

    socket.on("join-code-share", (codeShareId, userId) => {
      socket.join(codeShareId);
      if (!onlineUsersOnCodeShare.some((user) => user.userId === userId)) {
        onlineUsersOnCodeShare.push({
          userId: userId,
          codeShareId: codeShareId,
          socketId: socket.id,
        });
      }
      io.emit("get-users-on-code-share", onlineUsersOnCodeShare);
    });

    socket.on("get-users-on-code-share", () => {
      io.emit("get-users-on-code-share", onlineUsersOnCodeShare);
    });

    socket.on("leave-code-share", (codeShareId, userId) => {
      socket.leave(codeShareId);
      onlineUsersOnCodeShare = onlineUsersOnCodeShare.filter(
        (user) => user.userId !== userId
      );
      io.emit("get-users-on-code-share", onlineUsersOnCodeShare);
    });

    socket.on("calendar-update", () => {
      io.emit("calendar-update");
    });

    socket.on("event-update", (eventId) => {
      io.emit("event-update", eventId);
    });

    socket.on("employee-attendance-update", () => {
      io.emit("employee-attendance-update");
    });
  });

  // Cleanup delle sessioni inattive ogni 5 secondi
  setInterval(() => {
    const now = Date.now();
    for (const [socketId, session] of videoWindows.entries()) {
      if (session.lastPing && now - session.lastPing > 5000) {
        const { projectId, userId } = session;
        handleUserLeaveVideo(projectId, userId, io);
        videoWindows.delete(socketId);
      }
    }
  }, 5000);

  return io;
}

module.exports = createSocketServer;
