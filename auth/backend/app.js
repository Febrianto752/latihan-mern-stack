require("dotenv").config();
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const { API_VERSION } = process.env;
const PREFIX_API_URL = `/api/${API_VERSION}`;

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
const ordersRouter = require("./routes/orders");
const apiAuthRouter = require("./routes/api/auth");
const apiDashboardRouter = require("./routes/api/dashboard");

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());
app.use(bodyParser.json());

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/orders", ordersRouter);
app.use(`${PREFIX_API_URL}/auth`, apiAuthRouter);
app.use(`${PREFIX_API_URL}/dashboard`, apiDashboardRouter);

module.exports = app;
