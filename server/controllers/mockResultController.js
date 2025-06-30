const MockTestResult = require("../models/MockTestResult");
const Question = require("../models/Question");

const submitMockTest = async (req, res) => {
  try {
    const { userId, university, unit, answers, timeTaken } = req.body;

    if (!userId || !university || !unit || !Array.isArray(answers)) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    let correctCount = 0;
    let wrongCount = 0;

    const answerDetails = answers.map((ans) => {
      const selected =
        typeof ans.selectedOption === "string" &&
        ans.selectedOption.trim() !== ""
          ? ans.selectedOption.trim()
          : "not-answered";

      const isCorrect = selected === ans.correctOption;

      if (isCorrect) correctCount++;
      else if (selected !== "not-answered") wrongCount++;

      return {
        questionId: ans.questionId,
        selectedOption: selected,
        correctOption: ans.correctOption,
        isCorrect,
      };
    });

    const percentage =
      answers.length > 0
        ? Math.round((correctCount / answers.length) * 100)
        : 0;

    const newResult = await MockTestResult.create({
      userId,
      university,
      unit,
      totalQuestions: answers.length,
      correctCount,
      wrongCount,
      percentage,
      timeTaken,
      answers: answerDetails,
    });

    res.status(201).json({
      success: true,
      resultId: newResult._id,
    });
  } catch (error) {
    console.error("❌ Mock test submit error:", error);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};

// GET /mock-test/analysis/:userId

const getBasicMockAnalysis = async (req, res) => {
  const { userId } = req.params;

  try {
    const results = await MockTestResult.find({ userId });

    let correct = 0;
    let wrong = 0;

    results.forEach((result) => {
      correct += result.correctCount || 0;
      wrong += result.wrongCount || 0;
    });

    res.status(200).json({ correct, wrong });
  } catch (error) {
    console.error("❌ Analysis fetch error:", error);
    res.status(500).json({ message: "Failed to fetch analysis" });
  }
};

const getMockResultById = async (req, res) => {
  const { resultId } = req.params;

  try {
    const result = await MockTestResult.findById(resultId).populate("userId");

    if (!result) {
      return res.status(404).json({ message: "Result not found" });
    }

    res.status(200).json(result);
  } catch (error) {
    console.error("❌ Error fetching result:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const getMistakeBank = async (req, res) => {
  const { userId } = req.params;

  try {
    const results = await MockTestResult.find({ userId });

    const mistakes = [];

    for (const result of results) {
      for (const ans of result.answers) {
        if (!ans.isCorrect) {
          const question = await Question.findById(ans.questionId);
          if (question) {
            mistakes.push({
              question: question.question,
              options: question.options,
              correctAnswer: ans.correctOption,
              selectedAnswer: ans.selectedOption,
              explanation: question.explanation || "No explanation available.",
            });
          }
        }
      }
    }

    res.status(200).json(mistakes);
  } catch (error) {
    console.error("❌ Error fetching mistakes:", error);
    res.status(500).json({ message: "Failed to fetch mistake bank." });
  }
};

const getLeaderboard = async (req, res) => {
  try {
    const { university, unit } = req.params;

    if (!university || !unit) {
      return res.status(400).json({ message: "University or unit missing" });
    }

    const results = await MockTestResult.find({ university, unit })
      .sort({ percentage: -1, timeTaken: 1, createdAt: -1 }) // High % first, less time better, newest first
      .limit(10)
      .populate("userId", "name email");

    res.status(200).json({ success: true, data: results });
  } catch (error) {
    console.error("❌ Leaderboard fetch error:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch leaderboard" });
  }
};

module.exports = {
  submitMockTest,
  getBasicMockAnalysis,
  getMockResultById,
  getMistakeBank,
  getLeaderboard,
};
