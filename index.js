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
(async () => {
  const chalk = (await import("chalk")).default;

  const BOX_WIDTH = 50;

  // Funzione per creare una box chiusa con bordi superiori, laterali e inferiori
  const createBox = (title, port, environment) => {
    const borderTop = "╔" + "═".repeat(BOX_WIDTH - 2) + "╗";
    const borderBottom = "╚" + "═".repeat(BOX_WIDTH - 2) + "╝";
    const padding = BOX_WIDTH - 4;

    const titleLine = `║ ${title
      .padStart((padding + title.length) / 2, " ")
      .padEnd(padding, " ")} ║`;

    const portLine = `║ ${`Porta: ${port}`
      .padStart((padding + `Porta: ${port}`.length) / 2, " ")
      .padEnd(padding, " ")} ║`;

    const environmentLine = `║ ${`Ambiente: ${environment}`
      .padStart((padding + `Ambiente: ${environment}`.length) / 2, " ")
      .padEnd(padding, " ")} ║`;

    const poweredByLine = `║ ${"Powered By 🚀 Space Design Italia "
      .padStart((padding + "Powered By 🚀 Space Design Italia".length) / 2, " ")
      .padEnd(padding, " ")} ║`;

    return `\n${chalk.white(borderTop)}\n${chalk.whiteBright(
      titleLine
    )}\n${chalk.greenBright(portLine)}\n${chalk.yellowBright(
      environmentLine
    )}\n${chalk.cyanBright(poweredByLine)}\n${chalk.white(borderBottom)}`;
  };

  // Ambiente di sviluppo o produzione
  const environment =
    process.env.ENVIRONMENT === "development" ? "DEVELOPMENT" : "PRODUCTION";

  if (process.env.ENVIRONMENT === "development") {
    server.listen(PORT, () => {
      console.log(createBox("🚧 DEVELOPMENT Server", PORT, environment));
    });
  } else {
    server.listen(PORT, () => {
      console.log(createBox("🏭 PRODUCTION Server", PORT, environment));
    });
  }
})();

module.exports = server;
