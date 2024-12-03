const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const fs = require("fs");
const https = require("https");
const http = require("http");
const createSocketServer = require("./socket"); // Importa il modulo socket
require("dotenv").config();

// Importa le route
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
const createFileiconRoutes = require("./Routes/FileIcon/Fileicon");

const credentials = {
  key: fs.readFileSync("SSL/privateKey.key"),
  cert: fs.readFileSync("SSL/SpaceDesignAurora.pem"),
};

const app = express();
app.use(express.static("public"));
const PREFIX = "/API/v1";
const PORT = 3000; // Porta standard per HTTPS

const db = require("./configs/Database");

// Configura CORS
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
      "https://app.spacedesign-italia.it",
    ], // Aggiorna con gli URL HTTPS
    credentials: true,
  })
);

// Middleware
app.use(bodyParser.json());
app.use(
  session({
    secret: process.env.ENCRYPT_KEY,
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 60 * 60 * 1000,
    },
  })
);
app.use(cookieParser());

// Crea il server HTTPS
let server;
if (process.env.ENVIRONMENT === "development") {
  server = http.createServer(app);
} else {
  server = https.createServer(credentials, app);
}
/* const server = http.createServer(app); */
// Inizializza Socket.IO sul server HTTPS
const io = createSocketServer(server);

// Definisci le route principali
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

// Avvia il server HTTPS sulla porta 443
server.listen(PORT, () => {
  console.log(`Server HTTPS listening on port ${PORT}`);
});

module.exports = server;
