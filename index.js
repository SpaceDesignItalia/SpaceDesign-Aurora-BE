const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const http = require("http");
const createSocketServer = require("./socket"); // Import the socket module

// Main Routes declaration
const createAuthenticationRoutes = require("./Routes/Authentication/Authentication");
const createStafferRoutes = require("./Routes/Staffer/Staffer");
const createPermissionRoutes = require("./Routes/Permission/Permission");
const createCompanyRoutes = require("./Routes/Company/Company");
const createCustomerRoutes = require("./Routes/Customer/Customer");
const createProjectRoutes = require("./Routes/Project/Project");
const createChatRoutes = require("./Routes/Chat/Chat");
const createTicketRoutes = require("./Routes/Ticket/Ticket");
const createNotificationRoutes = require("./Routes/Notification/Notification");
const createLeadRoutes = require("./Routes/Lead/Lead");

const app = express();
app.use(express.static("public"));
const PREFIX = "/API/v1";
const PORT = 3000;

const db = require("./configs/Database");

// Setup CORS
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    credentials: true,
  })
);

// Middleware
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

// Create HTTP server
const server = http.createServer(app);

// Initialize Socket.IO
const io = createSocketServer(server); // Correct socket server initialization

// Main routes
app.use(PREFIX + "/Authentication", createAuthenticationRoutes(db));
app.use(PREFIX + "/Staffer", createStafferRoutes(db));
app.use(PREFIX + "/Permission", createPermissionRoutes(db));
app.use(PREFIX + "/Company", createCompanyRoutes(db));
app.use(PREFIX + "/Customer", createCustomerRoutes(db));
app.use(PREFIX + "/Chat", createChatRoutes(db));
app.use(PREFIX + "/Project", createProjectRoutes(db));
app.use(PREFIX + "/Ticket", createTicketRoutes(db));
app.use(PREFIX + "/Notification", createNotificationRoutes(db));
app.use(PREFIX + "/Lead", createLeadRoutes(db));

// Start the server
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

module.exports = server;
