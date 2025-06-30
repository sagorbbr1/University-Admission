const express = require("express");
const router = express.Router();

const {
  getAllNotices,
  submitNotices,
  deleteNotice,
} = require("../controllers/noticeController");

// Get all notices
router.get("/", getAllNotices);

// (Optional) Admin POST route
router.post("/", submitNotices);

// Delete a notice by ID
router.delete("/:id", deleteNotice);

module.exports = router;
