const mongoose = require("mongoose");
const { DB_NAME } = process.env;

const urlDB = `mongodb://localhost:27017/${DB_NAME}`;

mongoose.connect(urlDB);

const db = mongoose.connection;

module.exports = db;
