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

module.exports = { submitMockTest };
