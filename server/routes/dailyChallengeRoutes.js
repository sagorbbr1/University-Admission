const express = require("express");
const router = express.Router();

const {
  getDailyChallenge,
  submitDailyChallenge,
} = require("../controllers/dailyChallengeController");

// ✅ GET today's challenge
router.get("/", getDailyChallenge); // /api/daily-challenge

// ✅ POST answer to today's challenge
router.post("/submit", submitDailyChallenge); // /api/daily-challenge/submit

module.exports = router;
