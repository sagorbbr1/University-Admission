const MockTestResult = require("../models/MockTestResult");

const submitMockTest = async (req, res) => {
  try {
    const { userId, university, unit, answers } = req.body;

    let correctCount = 0;
    let wrongCount = 0;

    const answerDetails = answers.map((ans) => {
      const isCorrect = ans.selectedOption === ans.correctOption;
      if (isCorrect) correctCount++;
      else wrongCount++;

      return {
        questionId: ans.questionId,
        selectedOption: ans.selectedOption,
        correctOption: ans.correctOption,
        isCorrect,
      };
    });

    const newResult = await MockTestResult.create({
      userId,
      university,
      unit,
      totalQuestions: answers.length,
      correctCount,
      wrongCount,
      answers: answerDetails,
    });

    res.status(201).json({ success: true, resultId: newResult._id });
  } catch (error) {
    console.error("Mock test submit error:", error);
    res.status(500).json({ success: false, message: "Something went wrong" });
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

module.exports = {
  submitMockTest,
  getBasicMockAnalysis,
  getMockResultById,
};
