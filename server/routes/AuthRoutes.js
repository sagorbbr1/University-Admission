const express = require("express");
const {
  register,
  login,
  getProfile,
  updateProfile,
} = require("../controllers/authController.js");

const protect = require("../middleware/AuthMiddleware.js").protect;

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/user/profile", protect, getProfile);
router.put("/user/profile", protect, updateProfile);

module.exports = router;
