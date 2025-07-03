const mongoose = require("mongoose");

const dailyChallengeSchema = new mongoose.Schema(
  {
    date: { type: String, required: true },
    university: { type: String, required: true },
    unit: { type: String, required: true },
    questionIds: [{ type: mongoose.Schema.Types.ObjectId, ref: "Question" }],
  },
  { timestamps: true }
);

dailyChallengeSchema.index(
  { date: 1, university: 1, unit: 1 },
  { unique: true }
);

module.exports = mongoose.model("DailyChallenge", dailyChallengeSchema);
