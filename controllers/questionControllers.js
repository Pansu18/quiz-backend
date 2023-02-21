const asyncHandler = require("express-async-handler");

const Question = require("../models/questionModel");

// get question
const getQuestion = asyncHandler(async (req, res) => {
  const question = await Question.find();

  res.status(200).json(question);
});

// post question
const postQuestion = asyncHandler(async (req, res) => {
  const question = await Question.create({
    id: req.body.id,
    question: req.body.question,
    option: [
      {
        questionID: req.body.option[0].questionID,
        value: req.body.option[0].value,
        letter: req.body.option[0].letter,
      },
    ],
    correctAnswer: req.body.correctAnswer,
    type: req.body.type,
    weight: req.body.weight,
  });

  res.status(201).json(question);
});

module.exports = {
  getQuestion,
  postQuestion,
};
