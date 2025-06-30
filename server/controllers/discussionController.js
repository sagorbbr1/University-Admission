const Discussion = require("../models/Discussion");

// GET /discussions?page=1&limit=5
const getAllDiscussions = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const skip = (page - 1) * limit;

    const total = await Discussion.countDocuments();
    const totalPages = Math.ceil(total / limit);

    const discussions = await Discussion.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.status(200).json({ discussions, totalPages });
  } catch (err) {
    res.status(500).json({ message: "Failed to load discussions" });
  }
};

// GET /discussions/:id
const getDiscussionById = async (req, res) => {
  try {
    const discussion = await Discussion.findById(req.params.id);
    if (!discussion) return res.status(404).json({ message: "Not found" });
    res.status(200).json(discussion);
  } catch (err) {
    res.status(500).json({ message: "Error fetching discussion" });
  }
};

// POST /discussions
const postDiscussion = async (req, res) => {
  try {
    const { user, subject, question } = req.body;
    const newDiscussion = await Discussion.create({ user, subject, question });
    res.status(201).json(newDiscussion);
  } catch (err) {
    res.status(500).json({ message: "Failed to post discussion" });
  }
};

// POST /discussions/:id/reply
const postReply = async (req, res) => {
  try {
    const { text, user } = req.body;
    const discussion = await Discussion.findById(req.params.id);
    if (!discussion) return res.status(404).json({ message: "Not found" });

    discussion.replies.push({ text, user });
    await discussion.save();

    res.status(201).json(discussion);
  } catch (err) {
    res.status(500).json({ message: "Failed to post reply" });
  }
};

// // ✅ Update reply
// const updateReply = async (req, res) => {
//   const { id, replyId } = req.params;
//   const { text } = req.body;

//   try {
//     const discussion = await Discussion.findById(id);
//     if (!discussion)
//       return res.status(404).json({ message: "Discussion not found" });

//     const reply = discussion.replies.id(replyId);
//     if (!reply) return res.status(404).json({ message: "Reply not found" });

//     reply.text = text;
//     await discussion.save();
//     res.status(200).json(discussion);
//   } catch (err) {
//     res.status(500).json({ message: "Failed to update reply" });
//   }
// };

// // ✅ Delete reply
// const deleteReply = async (req, res) => {
//   const { id, replyId } = req.params;

//   try {
//     const discussion = await Discussion.findById(id);
//     if (!discussion)
//       return res.status(404).json({ message: "Discussion not found" });

//     const reply = discussion.replies.id(replyId);
//     if (!reply) return res.status(404).json({ message: "Reply not found" });

//     reply.remove();
//     await discussion.save();
//     res.status(200).json(discussion);
//   } catch (err) {
//     res.status(500).json({ message: "Failed to delete reply" });
//   }
// };

module.exports = {
  getAllDiscussions,
  postDiscussion,
  postReply,
  getDiscussionById,
};
