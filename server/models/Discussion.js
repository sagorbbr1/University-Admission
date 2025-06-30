const mongoose = require("mongoose");

const replySchema = new mongoose.Schema(
  {
    user: { type: String, required: true },
    text: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
  },
  { _id: false }
);

const discussionSchema = new mongoose.Schema(
  {
    user: { type: String, required: true },
    subject: { type: String, required: true },
    question: { type: String, required: true },
    replies: [replySchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Discussion", discussionSchema);
