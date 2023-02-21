const express = require("express");
const router = express.Router();
const {
  getQuestion,
  postQuestion,
  postResults,
} = require("../controllers/questionControllers");

router.route("/").get(getQuestion).post(postQuestion);
router.route("/results").post(postResults);
module.exports = router;
