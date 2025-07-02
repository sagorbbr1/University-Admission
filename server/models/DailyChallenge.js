const mongoose = require("mongoose");

const dailyChallengeSchema = new mongoose.Schema({
  date: { type: String, required: true, unique: true }, // YYYY-MM-DD
  questionIds: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Question",
      required: true,
    },
  ],
});

module.exports = mongoose.model("DailyChallenge", dailyChallengeSchema);
