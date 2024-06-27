// db.js
const { Pool } = require("pg");

const db = new Pool({
  user: "postgres",
  host: "93.93.116.160",
  database: "SpaceDesignAurora",
  password: "1234",
});

module.exports = db;
