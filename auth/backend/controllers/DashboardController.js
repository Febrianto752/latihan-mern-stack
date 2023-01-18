const jwt = require("jsonwebtoken");

module.exports = {
  dashboard: async function (req, res) {
    try {
      const { tokenValid, user } = req.filteredData;
      console.log(tokenValid);

      // jika token valid maka kirimkan data dashboard
      res.status(200).json({ username: user.username, orders: 10 });
    } catch (error) {
      // cek apakah error token expired
      if (error instanceof jwt.TokenExpiredError) {
        return res.status(403).json({ message: "your token has been expired" });
      }
      res.status(400).json({ message: error.message });
    }
  },
};
