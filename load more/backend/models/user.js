const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "name field cannot be empty!"],
    },
    email: {
      type: String,
      required: [true, "email field cannot be empty!"],
    },
    gender: {
      type: String,
      enum: ["female", "male"],
      default: "female",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
