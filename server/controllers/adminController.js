const Question = require("../models/Question");
const User = require("../models/UserModel");
const MockTestResult = require("../models/MockTestResult");
const { Parser } = require("json2csv");

const getAllQuestions = async (req, res) => {
  const questions = await Question.find().sort({ createdAt: -1 });
  res.json(questions);
};

const deleteQuestion = async (req, res) => {
  const { id } = req.params;
  await Question.findByIdAndDelete(id);
  res.json({ success: true });
};

const updateQuestion = async (req, res) => {
  try {
    const { id } = req.params;
    const { answer } = req.body;

    const updatedQuestion = await Question.findByIdAndUpdate(
      id,
      { answer },
      { new: true }
    );

    if (!updatedQuestion) {
      return res
        .status(404)
        .json({ success: false, message: "Question not found" });
    }

    res.status(200).json({ success: true, updated: updatedQuestion });
  } catch (error) {
    console.error("Update error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const getAllStudents = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const exportCsv = req.query.exportCsv === "true";

    // Find only users with role "student"
    const students = await User.find({ role: "student" })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await User.countDocuments({ role: "student" });

    const studentsWithStats = await Promise.all(
      students.map(async (student) => {
        const results = await MockTestResult.aggregate([
          { $match: { userId: student._id } },
          {
            $group: {
              _id: null,
              totalCorrect: { $sum: "$correctCount" },
              totalWrong: { $sum: "$wrongCount" },
            },
          },
        ]);

        const stats = results[0] || { totalCorrect: 0, totalWrong: 0 };

        return {
          _id: student._id,
          name: student.name,
          email: student.email,
          university: student.university || "N/A",
          unit: student.unit || "N/A",
          correctCount: stats.totalCorrect,
          wrongCount: stats.totalWrong,
          registeredAt: student.createdAt,
        };
      })
    );

    if (exportCsv) {
      const fields = [
        { label: "Name", value: "name" },
        { label: "Email", value: "email" },
        { label: "University", value: "university" },
        { label: "Unit", value: "unit" },
        { label: "Correct Answers", value: "correctCount" },
        { label: "Wrong Answers", value: "wrongCount" },
        {
          label: "Registered At",
          value: (row) => new Date(row.registeredAt).toISOString(),
        },
      ];
      const parser = new Parser({ fields });
      const csv = parser.parse(studentsWithStats);

      res.header("Content-Type", "text/csv");
      res.attachment("students.csv");
      return res.send(csv);
    }

    res.status(200).json({
      status: 200,
      ok: true,
      data: {
        students: studentsWithStats,
        pagination: {
          total,
          page,
          pages: Math.ceil(total / limit),
        },
      },
    });
  } catch (err) {
    console.error("❌ getAllStudents error:", err);
    res.status(500).json({ ok: false, message: "Server error" });
  }
};

const deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;

    // Only allow deleting students, not admins
    const student = await User.findOne({ _id: id, role: "student" });

    if (!student) {
      return res
        .status(404)
        .json({ success: false, message: "Student not found" });
    }

    await User.findByIdAndDelete(id);

    res.status(200).json({ success: true, message: "Student deleted" });
  } catch (error) {
    console.error("❌ Delete student error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
module.exports = {
  getAllQuestions,
  deleteQuestion,
  updateQuestion,
  getAllStudents,
  deleteStudent,
};
