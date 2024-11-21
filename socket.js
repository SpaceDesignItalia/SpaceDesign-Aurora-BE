// socket.js
const { Server } = require("socket.io");

let onlineUsers = [];

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

    socket.on("new-user-add", (newUserId) => {
      if (!onlineUsers.some((user) => user.userId === newUserId)) {
        // if user is not added before
        onlineUsers.push({
          userId: newUserId,
          status: "online",
          socketId: socket.id,
        });
      }
      // send all active users to new user
      io.emit("get-users", onlineUsers);
    });

    socket.on("disconnect", () => {
      onlineUsers = onlineUsers.filter((user) => user.socketId !== socket.id);
      // send all online users to all users
      io.emit("get-users", onlineUsers);
    });

    socket.on("offline", () => {
      // remove user from active users
      onlineUsers = onlineUsers.map((user) =>
        user.socketId === socket.id ? { ...user, status: "offline" } : user
      );
      // send all online users to all users
      io.emit("get-users", onlineUsers);
    });

    socket.on("get-users", () => {
      io.emit("get-users", onlineUsers);
    });
  });

  return io;
};

module.exports = createSocketServer;
