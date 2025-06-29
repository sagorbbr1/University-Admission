const express = require("express");
const router = express.Router();

const {
  getAllQuestions,
  deleteQuestion,
  updateQuestion,
  getAllStudents,
  deleteStudent,
} = require("../controllers/adminController");

// GET all questions
router.get("/questions", getAllQuestions);

// DELETE single question
router.delete("/questions/:id", deleteQuestion);

// PUT update question
router.put("/questions/:id", updateQuestion);

// GET all students
router.get("/students", getAllStudents);

// DELETE student by ID
router.delete("/students/:id", deleteStudent);

module.exports = router;
