const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const http = require("http");

//Main Routes declaration
const createStafferRoutes = require("./Routes/Staffer/Staffer");
const createPermissionRoutes = require("./Routes/Permission/Permission");
const createCompanyRoutes = require("./Routes/Company/Company");

const app = express();
app.use(express.static("public"));
const PREFIX = "/API/v1";
const PORT = 3000;

const db = require("./configs/Database");

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
      maxAge: 1080000,
    },
  })
);
app.use(cookieParser());

const server = http.createServer(app);

//Main routes
app.use(PREFIX + "/Staffer", createStafferRoutes(db));
app.use(PREFIX + "/Permission", createPermissionRoutes(db));
app.use(PREFIX + "/Company", createCompanyRoutes(db));

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
