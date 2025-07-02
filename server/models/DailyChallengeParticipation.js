const mongoose = require("mongoose");

const participationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    challengeDate: { type: String, required: true }, // YYYY-MM-DD
    selectedOption: String,
    isCorrect: Boolean,
  },
  { timestamps: true }
);

module.exports = mongoose.model(
  "DailyChallengeParticipation",
  participationSchema
);
