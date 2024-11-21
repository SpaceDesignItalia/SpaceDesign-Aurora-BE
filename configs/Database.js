// db.js
const { Pool } = require("pg");

const db = new Pool({
  user: "spacedesigndev",
  host: "lab.spacedesign-italia.it",
  database: "SpaceDesignAurora-Production",
  password: "imusRbRLPsStwgZa",
});

module.exports = db;
