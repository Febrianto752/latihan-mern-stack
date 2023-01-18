var express = require("express");
var router = express.Router();
const User = require("../models/user");

/* GET users listing. */
router.get("/", async function (req, res, next) {
  const page = req.query.page || 1;
  const limit = req.query.limit || 10;
  let skip = (page - 1) * limit;

  try {
    const users = await User.find().skip(skip).limit(limit);
    return res.status(200).json({ users });
  } catch (error) {
    console.log("error", error);
    return res.status(500).json({ message: error.message });
  }
});

module.exports = router;
