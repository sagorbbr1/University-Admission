const DailyChallenge = require("../models/DailyChallenge");
const Participation = require("../models/DailyChallengeParticipation");
const Question = require("../models/Question");
const moment = require("moment");

const getDailyChallenge = async (req, res) => {
  try {
    const today = moment().format("YYYY-MM-DD");

    let daily = await DailyChallenge.findOne({ date: today }).populate(
      "questionIds"
    );

    if (!daily) {
      const randomQuestions = await Question.aggregate([
        { $sample: { size: 30 } },
      ]);
      const questionIds = randomQuestions.map((q) => q._id);

      daily = await DailyChallenge.create({ date: today, questionIds });
      daily.questionIds = randomQuestions; // attach for return
    }

    res.status(200).json({ questions: daily.questionIds });
  } catch (err) {
    console.error("❌ Daily challenge fetch failed:", err);
    res.status(500).json({ message: "Failed to load daily challenge" });
  }
};

// POST /daily-challenge/submit

const submitDailyChallenge = async (req, res) => {
  try {
    const { userId, answers } = req.body; // answers: [{questionId, selectedOption}]
    const today = moment().format("YYYY-MM-DD");

    // Check if already submitted
    const existing = await Participation.findOne({
      userId,
      challengeDate: today,
    });

    if (existing) {
      return res.status(200).json({
        alreadySubmitted: true,
        correctCount: existing.correctCount || 0,
        message: "You already submitted today’s challenge!",
      });
    }

    // Check if challenge exists
    const daily = await DailyChallenge.findOne({ date: today });
    if (!daily) return res.status(404).json({ message: "No daily challenge" });

    // Evaluate answers
    let correctCount = 0;

    for (const ans of answers) {
      const question = await Question.findById(ans.questionId);
      if (!question) continue;

      if (question.answer === ans.selectedOption) correctCount++;
    }

    // Save participation
    await Participation.create({
      userId,
      challengeDate: today,
      answers, // storing full answer array is better than [BULK]
      correctCount,
    });

    res.status(201).json({ message: "Submitted", correctCount });
  } catch (err) {
    console.error("❌ Daily challenge submit failed:", err);
    res.status(500).json({ message: "Failed to submit answer" });
  }
};
module.exports = { getDailyChallenge, submitDailyChallenge };
