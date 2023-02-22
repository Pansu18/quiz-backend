const mongoose = require("mongoose");

const authSchema = mongoose.Schema({
  name: {
    type: String,
  },
  gender: {
    type: String,
  },
  email: {
    type: String,
    required: [true, "Please add a email address"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please add a password"],
  },
  cpassword: {
    type: String,
    required: [true, "Please add a password"],
  },
});

module.exports = mongoose.model("User", authSchema);
