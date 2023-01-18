const express = require("express");
const router = express.Router();
const { dashboard } = require("../../controllers/DashboardController");
const { isSignin } = require("../../middlewares/auth");

router.get("/", isSignin, dashboard);

module.exports = router;
