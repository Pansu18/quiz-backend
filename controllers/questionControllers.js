const asyncHandler = require("express-async-handler");

const Question = require("../models/questionModel");
const Results = require("../models/resultsModel");
const Answer = require("../models/answerModel");

// get question
const getQuestion = asyncHandler(async (req, res) => {
  try {
    const question = await Question.find();

    res.status(200).json(question);
  } catch (error) {
    console.log(error);
  }
});

// post question
const postQuestion = asyncHandler(async (req, res) => {
  try {
    const options = req.body.option.map((opt) => {
      return {
        questionID: opt.questionID,
        value: opt.value,
        letter: opt.letter,
      };
    });
    const question = await Question.create({
      id: req.body.id,
      question: req.body.question,
      option: options,
      correctAnswer: req.body.correctAnswer,
      type: req.body.type,
      weight: req.body.weight,
    });

    res.status(201).json(question);
  } catch (error) {
    console.log(error);
  }
});

// results post
const postResults = asyncHandler(async (req, res) => {
  try {
    let score = 0;
    const answerBody = req.body;
    console.log("req.bod", answerBody);
    const QuestionModel = await Question.find({}, "+correctAnswer +weight");
    const compareAnswer = answerBody.map((item) => {
      const compareQuestion = QuestionModel.find(
        (comparator) => comparator.id === item.id
      );
      if (compareQuestion.correctAnswer === item.questionID) {
        score += compareAnswer.weight;
        return { ...item, correct: true };
      } else {
        return { ...item, correct: false };
      }
    });

    const newResults = new Results({
      id: req.id,
      answer: compareAnswer,
      score: score,
    });

    // const answers = new Answer({
    //   id: req.id,
    //   answer: compareAnswer,
    // });

    await newResults.save();
    // await answers.save();
    console.log("correct", compareAnswer);
    console.log("results", newResults);

    res.status(201).json({ newResults, compareAnswer });
  } catch (error) {}
});

module.exports = {
  getQuestion,
  postQuestion,
  postResults,
};
