const Question = require("../models/Question");
const csv = require("csv-parser");
const fs = require("fs");
const path = require("path");

// @desc    Add a single question manually
// @route   POST /api/questions/add
// @access  Admin
const addQuestion = async (req, res) => {
  try {
    const { university, unit, sub, year, question, options, answer } = req.body;

    if (
      !university ||
      !unit ||
      !sub ||
      !year ||
      !question ||
      !options ||
      !answer
    ) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const newQuestion = new Question({
      university,
      unit,
      sub,
      year,
      question,
      options,
      answer,
    });

    await newQuestion.save();

    res.status(201).json({ message: "✅ Question added successfully" });
  } catch (err) {
    console.error("❌ Error adding question:", err.message);
    res
      .status(500)
      .json({ message: "Failed to add question", error: err.message });
  }
};

const bulkUpload = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  console.log("Bulk upload file:", req.file);

  const filePath = path.join(__dirname, "..", req.file.path);
  const questions = [];

  try {
    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (row) => {
        if (
          row.university &&
          row.unit &&
          row.sub &&
          row.year &&
          row.question &&
          row.option1 &&
          row.option2 &&
          row.option3 &&
          row.option4 &&
          row.answer
        ) {
          questions.push({
            university: row.university,
            unit: row.unit,
            sub: row.sub,
            year: row.year,
            question: row.question,
            options: [row.option1, row.option2, row.option3, row.option4],
            answer: row.answer,
          });
        }
      })
      .on("end", async () => {
        try {
          await Question.insertMany(questions);
          fs.unlinkSync(filePath); // Clean up uploaded file
          res.status(200).json({
            message: `✅ ${questions.length} questions uploaded successfully.`,
          });
        } catch (err) {
          console.error("❌ Failed to save bulk questions:", err.message);
          res.status(500).json({
            message: "Error saving bulk questions",
            error: err.message,
          });
        }
      });
  } catch (err) {
    console.error("❌ Bulk upload failed:", err.message);
    res.status(500).json({ message: "Bulk upload error", error: err.message });
  }
};

module.exports = {
  addQuestion,
  bulkUpload,
};
