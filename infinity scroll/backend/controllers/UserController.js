const User = require("../models/user");

module.exports = {
  getUsers: async (req, res) => {
    console.log(req.query, req.params);
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 30;
    const search = req.query.search || "";
    let skip = (page - 1) * limit;

    if (search) {
      try {
        const users = await User.find({
          name: { $regex: `.*${search}.*`, $options: "i" },
        })
          .skip(skip)
          .limit(limit);

        console.log(users);
        return res.status(200).json({ users, limit });
      } catch (error) {
        return res.status(500).json({ message: error.message });
      }
    }

    try {
      const users = await User.find().skip(skip).limit(limit);

      return res.status(200).json({ users, limit });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
};
