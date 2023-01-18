const jwt = require("jsonwebtoken");
const { SECRET } = process.env;
const User = require("../models/user");

module.exports = {
  isSignin: async function (req, res, next) {
    try {
      const token = req.headers.authorization
        ? req.headers.authorization.replace("Bearer ", "")
        : null;

      if (!token) {
        return res
          .status(401)
          .json({ message: "Not authorized to acces this resource" });
      }
      const verifyToken = jwt.verify(token, SECRET);
      /* contoh output : 
        { username: 'febrianto', iat: 1667705090, exp: 1667791490 }
        NOTE : iat menunjukan kapan token tersebut dibuat
      */

      const user = await User.findOne({ username: verifyToken.username });
      // jika data user tidak ditemukan
      if (!user) {
        return res
          .status(403)
          .json({ message: "Not authorized to acces this resource" });
      }

      req.filteredData = { validToken: verifyToken, user };
      next();
    } catch (error) {
      // cek apakah error token expired
      if (error instanceof jwt.TokenExpiredError) {
        return res.status(401).json({ message: "your token has been expired" });
      }
      res.status(400).json({ message: error.message });
    }
  },
};
