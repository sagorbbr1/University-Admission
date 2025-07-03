const mongoose = require("mongoose");

const dailyChallengeSubmissionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  university: {
    type: String,
    required: true,
  },
  unit: {
    type: String,
    required: true,
  },
  answers: [
    {
      questionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Question",
        required: true,
      },
      selectedOption: {
        type: String,
        required: true,
      },
    },
  ],
  correctCount: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model(
  "DailyChallengeSubmission",
  dailyChallengeSubmissionSchema
);
