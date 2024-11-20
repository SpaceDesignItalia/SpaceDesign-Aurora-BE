const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const fs = require("fs");
const https = require("https");
const createSocketServer = require("./socket"); // Importa il modulo socket

// Percorso ai certificati
const privateKey = fs.readFileSync("./SSL/privateKey.key", "utf8");
const certificate = fs.readFileSync("./SSL/certificate.cer", "utf8");
const ca = fs.readFileSync("./SSL/SpaceDesignAurora.pem", "utf8");

const credentials = {
  key: privateKey,
  cert: certificate,
  ca: ca,
};

const app = express();
app.use(express.static("public"));
const PREFIX = "/API/v1";
const PORT = 443; // Porta HTTPS standard

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

// Crea il server HTTPS
const server = https.createServer(credentials, app);

// Initialize Socket.IO
const io = createSocketServer(server);

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
app.use(PREFIX + "/Fileicon", createFileiconRoutes());

// Avvia il server HTTPS
server.listen(PORT, () => {
  console.log(`Server HTTPS listening on port ${PORT}`);
});

module.exports = server;
