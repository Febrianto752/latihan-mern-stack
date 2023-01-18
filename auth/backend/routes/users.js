var express = require("express");
var router = express.Router();

/* GET users listing, url = localhost:3000/users. */
router.get("/", function (req, res, next) {
  res.send(app_name);
});

module.exports = router;
