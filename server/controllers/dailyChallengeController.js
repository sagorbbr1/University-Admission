const moment = require("moment");
const DailyChallenge = require("../models/DailyChallenge");
const DailyChallengeSubmission = require("../models/DailyChallengeSubmission");
const Question = require("../models/Question");

// GET today's challenge questions
const getDailyChallenge = async (req, res) => {
  try {
    const { university, unit } = req.query;

    if (!university || !unit) {
      return res.status(400).json({ message: "University and unit required" });
    }

    const today = moment().format("YYYY-MM-DD");

    let daily = await DailyChallenge.findOne({
      date: today,
      university,
      unit,
    }).populate("questionIds");

    if (!daily) {
      const randomQuestions = await Question.aggregate([
        { $match: { university, unit } },
        { $sample: { size: 30 } },
      ]);

      const questionIds = randomQuestions.map((q) => q._id);

      // Create new challenge for today (no duplicate allowed)
      daily = await DailyChallenge.findOneAndUpdate(
        { date: today, university, unit },
        { $setOnInsert: { questionIds, university, unit, date: today } },
        { new: true, upsert: true }
      );

      // Re-fetch populated
      daily = await DailyChallenge.findById(daily._id).populate("questionIds");
    }

    res.status(200).json({ questions: daily.questionIds });
  } catch (err) {
    console.error("❌ Daily challenge fetch failed:", err);
    res.status(500).json({ message: "Failed to load daily challenge" });
  }
};

const getSubmissionStatus = async (req, res) => {
  try {
    const today = moment().format("YYYY-MM-DD");
    const { userId, university, unit } = req.query;

    const submission = await DailyChallengeSubmission.findOne({
      userId,
      date: today,
      university,
      unit,
    });

    if (submission) {
      const questionIds = submission.answers.map((a) =>
        a.questionId.toString()
      );

      // Fetch all relevant questions
      const questionsData = await Question.find({ _id: { $in: questionIds } });

      // 🧠 Preserve original order as submitted
      const orderedQuestions = questionIds
        .map((qid) => questionsData.find((q) => q._id.toString() === qid))
        .filter(Boolean); // remove any missing/null

      return res.status(200).json({
        hasSubmitted: true,
        correctCount: submission.correctCount,
        answers: submission.answers,
        questions: orderedQuestions, // includes correctAnswer
      });
    }

    return res.status(200).json({ hasSubmitted: false });
  } catch (err) {
    console.error("❌ Error checking submission status:", err);
    return res.status(500).json({ message: "Failed to check status" });
  }
};

// Submit daily challenge
const submitDailyChallenge = async (req, res) => {
  try {
    const { userId, answers, university, unit } = req.body;
    const today = moment().format("YYYY-MM-DD");

    // Prevent multiple submissions
    const existing = await DailyChallengeSubmission.findOne({
      userId,
      university,
      unit,
      date: today,
    });

    if (existing) {
      return res.status(400).json({ message: "Already submitted today" });
    }

    const questionIds = answers.map((a) => a.questionId);
    const questions = await Question.find({ _id: { $in: questionIds } });

    let correctCount = 0;
    answers.forEach(({ questionId, selectedOption }) => {
      const question = questions.find((q) => q._id.toString() === questionId);
      if (question && question.answer === selectedOption) {
        correctCount++;
      }
    });

    await DailyChallengeSubmission.create({
      userId,
      university,
      unit,
      date: today,
      answers,
      correctCount,
    });

    return res.status(200).json({ correctCount });
  } catch (err) {
    console.error("❌ Submission failed:", err);
    res.status(500).json({ message: "Challenge submission failed" });
  }
};

module.exports = {
  getDailyChallenge,
  submitDailyChallenge,
  getSubmissionStatus,
};
