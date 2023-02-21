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
  correctAnswer: { type: Number },
  type: { type: String },
  weight: { type: Number },
});

module.exports = mongoose.model("Question", questionSchema);
