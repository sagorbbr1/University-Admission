const express = require("express");
const router = express.Router();
const {
  getDailyChallenge,
  getSubmissionStatus,
  submitDailyChallenge,
} = require("../controllers/dailyChallengeController");

router.get("/", getDailyChallenge);
router.get("/status", getSubmissionStatus);
router.post("/submit", submitDailyChallenge);

module.exports = router;
