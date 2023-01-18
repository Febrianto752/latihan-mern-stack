const mongoose = require("mongoose");
const { URL_ROOT_DB } = process.env;
const { DB_NAME } = process.env;

const urlDB = `${URL_ROOT_DB}/${DB_NAME}`;

mongoose.connect(urlDB);

const db = mongoose.connection;

module.exports = db;
