const express = require("express");
const router = express.Router();
const {
  getAllDiscussions,
  postDiscussion,
  postReply,
  getDiscussionById,
} = require("../controllers/discussionController");

router.get("/", getAllDiscussions);
router.get("/:id", getDiscussionById);
router.post("/", postDiscussion);
router.post("/:id/reply", postReply);
// router.put("/:id/reply/:replyId", updateReply);
// router.delete("/:id/reply/:replyId", deleteReply);

module.exports = router;
