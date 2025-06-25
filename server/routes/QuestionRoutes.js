const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = require("../middleware/upload");

const {
  addQuestion,
  bulkUpload,
} = require("../controllers/questionController");

// Manual add
router.post("/add", addQuestion);

// Bulk upload
router.post("/bulk", upload.single("file"), bulkUpload);

module.exports = router;
