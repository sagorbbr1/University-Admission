const express = require("express");
const router = express.Router();
const {
  submitMockTest,
  getBasicMockAnalysis,
  getMockResultById,
  getMistakeBank,
} = require("../controllers/mockResultController");

router.post("/submit", submitMockTest);

// GET result analysis by user ID
router.get("/analysis/:userId", getBasicMockAnalysis);

// GET mock result by ID

router.get("/:resultId", getMockResultById);

router.get("/mistakes/:userId", getMistakeBank);

module.exports = router;
