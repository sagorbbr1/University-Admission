const mongoose = require("mongoose");

const answerSchema = new mongoose.Schema({
  questionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Question",
    required: true,
  },
  selectedOption: { type: String, required: true },
  correctOption: { type: String, required: true },
  isCorrect: { type: Boolean, required: true },
});

const mockTestResultSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    university: { type: String, required: true },
    unit: { type: String, required: true },
    totalQuestions: Number,
    correctCount: Number,
    wrongCount: Number,
    percentage: Number,
    timeTaken: Number,
    answers: [answerSchema],
    takenAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("MockTestResult", mockTestResultSchema);
