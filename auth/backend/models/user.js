const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "username field cannot be empty!"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "password field must be filled"],
    },
    age: {
      type: Number,
    },
  },
  { timestamps: true }
);

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);
