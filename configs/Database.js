// db.js
const { Pool } = require("pg");

const db = new Pool({
  user: "spacedesigndev",
  host: "lab.spacedesign-italia.it",
  database: "SpaceDesignAurora-Development",
  password: "imusRbRLPsStwgZa",
});

/*const db = new Pool({
  user: "postgres",
  host: "localhost",
  database: "SpaceDesignAurora",
  password: "1234",
});*/

module.exports = db;
