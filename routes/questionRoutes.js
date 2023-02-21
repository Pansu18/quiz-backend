const express = require("express");
const router = express.Router();
const {
  getQuestion,
  postQuestion,
} = require("../controllers/questionControllers");

router.route("/").get(getQuestion).post(postQuestion);
module.exports = router;
