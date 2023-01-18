import { Sequelize } from "sequelize";

// const DB_NAME = "crud_upload_mern";
// const USERNAME = "root";
// const PASSWORD = "";
const DB_NAME = "newbierr_upload_mern";
const USERNAME = "newbierr_febrianto";
const PASSWORD = "#]u^}Yr2Hf{P";

const db = new Sequelize(DB_NAME, USERNAME, PASSWORD, {
  // host: "localhost",
  host: "203.161.184.116",
  dialect: "mysql",
});

export default db;
