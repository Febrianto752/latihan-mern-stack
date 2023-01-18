const User = require("../models/user");
const bcrypt = require("bcrypt");
const { SECRET } = process.env;
const jwt = require("jsonwebtoken");

module.exports = {
  signup: async function (req, res) {
    const { username, password, confirmPassword, age } = req.body;

    if (password !== confirmPassword) {
      res
        .status(400)
        .json({ message: "password and confirm password dont match!" });
    }

    try {
      const salt = await bcrypt.genSalt();
      const hashPassword = await bcrypt.hash(password, salt);

      const user = await User.create({ username, password: hashPassword, age });

      res.status(201).json({
        message: "success to create user",
        user: {
          username: user.username,
          password: user.password,
          age: user.age,
        },
      });
    } catch (error) {
      console.log("error", error.message);
      res.status(500).json({ message: error.message });
    }
  },

  signin: async function (req, res) {
    try {
      const { username, password } = req.body;
      if (!username) {
        return res
          .status(400)
          .json({ message: "username field cannot be empty!" });
      }

      const user = await User.findOne({ username });
      // jika username salah
      if (!user) {
        return res.status(400).json({ message: "your credential are wrong!" });
      }

      const match = await bcrypt.compare(password, user.password);
      // jika password salah
      if (!match) {
        return res.status(400).json({ message: "your credential are wrong!" });
      }

      // jika username dan password benar
      const accessToken = jwt.sign(
        { username: user.username, age: user.age },
        SECRET,
        { expiresIn: "1d" }
      );

      return res
        .status(200)
        .json({ message: "success login", token: accessToken });
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  },
};
