const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require("../models/authModel");

// register user
// access public
const registerUser = asyncHandler(async (req, res) => {
  const { name, gender, email, password, cpassword } = req.body;

  if (!name || !gender || !email || !password || !cpassword) {
    res.status(400);
    throw new Error("Please add all fields");
  }

  //   check if user exist
  const userExist = await User.findOne({ email });

  if (userExist) {
    res.status(400);
    throw new Error("User already exists");
  }

  //   hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const hashedCpassword = await bcrypt.hash(cpassword, salt);

  //   create user
  const user = await User.create({
    name,
    gender,
    email,
    password: hashedPassword,
    cpassword: hashedCpassword,
  });

  if (user) {
    res.status(201).json({
      accessToken: generateToken(user._id),
      user: {
        _id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// auth login
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Check for user email
  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      accessToken: generateToken(user._id),
      user: {
        _id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } else {
    res.status(400);
    throw new Error("Invalid credentials");
  }
});

// Get user data
const getUserData = asyncHandler(async (req, res) => {
  const { _id, name, email } = await User.findById(req.user.id);

  res.status(200).json({
    id: _id,
    name,
    email,
  });
});

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

module.exports = {
  registerUser,
  loginUser,
  getUserData,
};
