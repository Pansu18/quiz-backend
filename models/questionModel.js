const mongoose = require("mongoose");

const questionSchema = mongoose.Schema({
  id: { type: Number },
  question: { type: String },
  option: [
    {
      questionID: { type: Number },
      value: { type: String },
      letter: { type: String },
    },
  ],
  correctAnswer: { type: Number, select: false },
  type: { type: String },
  weight: { type: Number, select: false },
});

module.exports = mongoose.model("Question", questionSchema);
