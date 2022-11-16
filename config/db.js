const mysql = require("mysql");
const dotenv = require("dotenv");
dotenv.config();
const connection = mysql.createConnection({
  port: process.env.DB_PORT,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  timezone: process.env.TM_ZONE,
});

connection.connect((err) => {
  if (!err) {
    console.log("database connection successful");
  } else {
    console.log("Database connection failed");
  }
});
module.exports = connection;
