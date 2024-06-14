const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const http = require("http");

//Main Routes declaration
const createAuthenticationRoutes = require("./Routes/Authentication/Authentication");
const createStafferRoutes = require("./Routes/Staffer/Staffer");
const createPermissionRoutes = require("./Routes/Permission/Permission");
const createCompanyRoutes = require("./Routes/Company/Company");
const createCustomerRoutes = require("./Routes/Customer/Customer");
const createChatRoutes = require("./Routes/Chat/Chat");

const app = express();
app.use(express.static("public"));
const PREFIX = "/API/v1";
const PORT = 3000;

const db = require("./configs/Database");
const { Server } = require("socket.io");

app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    credentials: true,
  })
);

app.use(bodyParser.json());
app.use(
  session({
    secret: "T^pX#z1$0%V@l2&nHbO8yGcLsAaE!WuPq4Rv7*3Sd9MwYjNfCmKgJiBkD5F",
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 60 * 60 * 1000,
    },
  })
);
app.use(cookieParser());

const server = http.createServer(app);

//Main routes
app.use(PREFIX + "/Authentication", createAuthenticationRoutes(db));
app.use(PREFIX + "/Staffer", createStafferRoutes(db));
app.use(PREFIX + "/Permission", createPermissionRoutes(db));
app.use(PREFIX + "/Company", createCompanyRoutes(db));
app.use(PREFIX + "/Customer", createCustomerRoutes(db));
app.use(PREFIX + "/Chat", createChatRoutes(db));

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173", "http://localhost:5174"],
    methods: ["GET", "POST"],
    credentials: true,
  },
});

io.on("connection", async (socket) => {
  console.log("User connected");

  socket.on("join", async (conversationId) => {
    socket.join(conversationId);
    console.log("user joined conversation: ", conversationId);
  });

  socket.on("message", async (conversationId) => {
    io.to(conversationId).emit("message-update");
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});
