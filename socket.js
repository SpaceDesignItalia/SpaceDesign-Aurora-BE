// socket.js
const { Server } = require("socket.io");

const createSocketServer = (httpServer) => {
  const io = new Server(httpServer, {
    cors: {
      origin: ["http://localhost:5173", "http://localhost:5174"],
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
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
      io.to(ProjectId).emit("file-update", ProjectId);
    });

    socket.on("join-notifications", (userId) => {
      socket.join(userId);
    });

    socket.on("delete-notifications", (userId) => {
      io.to(userId).emit("delete-notifications");
    });

    function sendNotification(userId) {
      io.to(userId).emit("newNotification");
    }

    module.exports.sendNotification = sendNotification;

    socket.on("disconnect", () => {});
  });

  return io;
};

module.exports = createSocketServer;
