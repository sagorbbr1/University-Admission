const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = require("../middleware/upload");

const {
  addQuestion,
  bulkUpload,
  getAllUniversities,
  getUnitsByUniversity,
  getYearsByUniversityAndUnit,
  getQuestionsByUniversityUnitYear,
  getQuestionsByUniversityUnit,
} = require("../controllers/questionController");

// Manual add
router.post("/add", addQuestion);

// Bulk upload
router.post("/bulk", upload.single("file"), bulkUpload);

// Get all universities
router.get("/universities", getAllUniversities);

// Get units by university

router.get("/units/:university", getUnitsByUniversity);

// Get years by university and unit

router.get("/years/:university/:unit", getYearsByUniversityAndUnit);

// Get questions by university and unit (no year filter)
router.get("/mock/:university/:unit", getQuestionsByUniversityUnit);

//Get questions by university, unit, and year
router.get("/:university/:unit/:year", getQuestionsByUniversityUnitYear);

module.exports = router;
