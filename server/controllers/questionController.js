const Question = require("../models/Question");
const csv = require("csv-parser");
const fs = require("fs");
const path = require("path");
const iconv = require("iconv-lite");

// 🧠 Add Single Question
const addQuestion = async (req, res) => {
  try {
    const { university, unit, sub, year, question, options, answer } = req.body;

    if (
      !university ||
      !unit ||
      !sub ||
      !year ||
      !question ||
      !Array.isArray(options) ||
      options.length !== 4 ||
      !answer
    ) {
      return res.status(400).json({
        message:
          "❌ All fields are required and options must be an array of 4 items.",
      });
    }

    const newQuestion = new Question({
      university: university.trim(),
      unit: unit.trim(),
      sub: sub.trim(),
      year: year.trim(),
      question: question.trim(),
      options: options.map((opt) => opt.trim()),
      answer: answer.trim(),
    });

    await newQuestion.save();

    res.status(201).json({ message: "✅ Question added successfully" });
  } catch (err) {
    console.error("❌ Error adding question:", err.message);
    res
      .status(500)
      .json({ message: "❌ Failed to add question", error: err.message });
  }
};

// 📂 Bulk Upload
const bulkUpload = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "❌ No file uploaded" });
  }

  const filePath = path.join(__dirname, "..", req.file.path);
  const questions = [];

  try {
    const readStream = fs
      .createReadStream(filePath)
      .pipe(iconv.decodeStream("utf-8"));

    readStream
      .pipe(csv())
      .on("data", (row) => {
        const {
          university,
          unit,
          sub,
          year,
          question,
          option1,
          option2,
          option3,
          option4,
          answer,
        } = row;

        if (
          university &&
          unit &&
          sub &&
          year &&
          question &&
          option1 &&
          option2 &&
          option3 &&
          option4 &&
          answer
        ) {
          questions.push({
            university: university.trim(),
            unit: unit.trim(),
            sub: sub.trim(),
            year: year.trim(),
            question: question.trim(),
            options: [
              option1.trim(),
              option2.trim(),
              option3.trim(),
              option4.trim(),
            ],
            answer: answer.trim(),
          });
        }
      })
      .on("end", async () => {
        try {
          fs.unlinkSync(filePath); // Clean up temp CSV file

          if (questions.length === 0) {
            console.warn("❌ No valid questions found after parsing.");
            return res
              .status(400)
              .json({ message: "❌ No valid questions found in CSV." });
          }

          // Optional: Deduplicate based on question + year
          const uniqueQuestions = questions.filter(
            (q, idx, self) =>
              idx ===
              self.findIndex(
                (t) => t.question === q.question && t.year === q.year
              )
          );

          await Question.insertMany(uniqueQuestions);

          return res.status(200).json({
            message: `✅ ${uniqueQuestions.length} questions uploaded successfully.`,
          });
        } catch (dbErr) {
          console.error("❌ Error inserting questions:", dbErr.message);
          return res.status(500).json({
            message: "❌ Failed to insert questions",
            error: dbErr.message,
          });
        }
      })
      .on("error", (csvErr) => {
        console.error("❌ CSV Parse Error:", csvErr.message);
        fs.unlinkSync(filePath); // Clean file on parse error
        return res.status(500).json({
          message: "❌ Error parsing CSV file",
          error: csvErr.message,
        });
      });
  } catch (err) {
    console.error("❌ Bulk upload error:", err.message);
    fs.unlinkSync(filePath); // Clean file on unexpected error
    return res.status(500).json({
      message: "❌ Bulk upload failed",
      error: err.message,
    });
  }
};

const getAllUniversities = async (req, res) => {
  try {
    const universities = await Question.distinct("university");
    res.status(200).json(universities);
  } catch (err) {
    console.error("❌ Error fetching universities:", err.message);
    res.status(500).json({ message: "Failed to fetch universities" });
  }
};

const getUnitsByUniversity = async (req, res) => {
  const { university } = req.params;

  try {
    const units = await Question.distinct("unit", { university });
    res.status(200).json(units);
  } catch (err) {
    console.error("❌ Error fetching units:", err.message);
    res.status(500).json({ message: "Failed to fetch units" });
  }
};

const getYearsByUniversityAndUnit = async (req, res) => {
  try {
    const { university, unit } = req.params;

    if (!university || !unit) {
      return res.status(400).json({ message: "University and Unit required" });
    }

    // Normalize inputs (case-insensitive and trimmed)
    const formattedUniversity = decodeURIComponent(university).trim();
    const formattedUnit = decodeURIComponent(unit).trim();

    // Fetch distinct years
    const years = await Question.distinct("year", {
      university: { $regex: `^${formattedUniversity}$`, $options: "i" },
      unit: { $regex: `^${formattedUnit}$`, $options: "i" },
    });

    if (!years.length) {
      return res.status(404).json({ message: "No years found for this unit." });
    }

    const sorted = years.sort((a, b) => b - a); // descending
    return res.status(200).json(sorted);
  } catch (err) {
    console.error("❌ Error fetching years:", err);
    return res
      .status(500)
      .json({ message: "Server error", error: err.message });
  }
};

const getQuestionsByUniversityUnitYear = async (req, res) => {
  const { university, unit, year } = req.params;

  try {
    const questions = await Question.find({
      university,
      unit,
      year,
    }).select("-__v");

    res.status(200).json(questions);
  } catch (err) {
    console.error("❌ Error fetching questions:", err.message);
    res.status(500).json({
      message: "❌ Failed to fetch questions",
      error: err.message,
    });
  }
};

//Mock Test - Get Random Questions by University and Unit
const getQuestionsByUniversityUnit = async (req, res) => {
  try {
    let { university, unit } = req.params;

    if (!university || !unit) {
      return res
        .status(400)
        .json({ error: "University and unit are required" });
    }

    university = university.trim();
    unit = unit.trim();

    const limit = parseInt(req.query.limit) || 25;

    // Case-insensitive regex match
    const questions = await Question.find({
      university: new RegExp(`^${university}$`, "i"),
      unit: new RegExp(`^${unit}$`, "i"),
    }).limit(limit);

    if (!questions.length) {
      return res
        .status(404)
        .json({ error: "No questions found for this university and unit" });
    }

    return res.status(200).json(questions);
  } catch (error) {
    console.error("❌ Failed to fetch questions:", error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  addQuestion,
  bulkUpload,
  getAllUniversities,
  getUnitsByUniversity,
  getYearsByUniversityAndUnit,
  getQuestionsByUniversityUnitYear,
  getQuestionsByUniversityUnit,
};
