const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema(
  {
    university: { type: String, required: true },
    unit: { type: String, required: true },
    sub: { type: String, required: true },
    year: { type: String, required: true },
    question: { type: String, required: true },
    options: [{ type: String }],
    answer: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Question", questionSchema);
