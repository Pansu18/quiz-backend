const mongoose = require("mongoose");

const answerSchema = mongoose.Schema({
  id: { type: Number },
  answer: [
    {
      questionID: { type: Number },
      value: { type: String },
      letter: { type: String },
      correct: { type: Boolean },
    },
  ],
});

module.exports = mongoose.model("Results", answerSchema);
