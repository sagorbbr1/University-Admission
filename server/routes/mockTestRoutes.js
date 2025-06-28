const express = require("express");
const router = express.Router();
const { submitMockTest } = require("../controllers/mockResultController");

router.post("/submit", submitMockTest);

module.exports = router;
