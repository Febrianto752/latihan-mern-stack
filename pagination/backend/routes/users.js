var express = require("express");
var router = express.Router();
const User = require("../models/user");

/* GET users listing. */
router.get("/", async function (req, res, next) {
  const page = req.query.page || 1;
  const limit = req.query.limit || 10;
  const search = req.query.search || "";
  let skip = (page - 1) * 10;

  if (search) {
    try {
      const users = await User.find({
        name: { $regex: `.*${search}.*`, $options: "i" },
      });
      const total_user = users.length;
      const users_perpage = users.slice(skip, skip + limit);
      const total_page = Math.ceil(total_user / limit);

      return res.status(200).json({
        users_perpage,
        total_user,
        total_page,
      });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  try {
    const users = await User.find();
    const total_user = users.length;
    const users_perpage = users.slice(skip, skip + limit);
    const total_page = Math.ceil(total_user / limit);

    return res.status(200).json({
      users_perpage,
      total_user,
      total_page,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

module.exports = router;
