const User = require("../models/UserModel");
const jwt = require("jsonwebtoken");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  });
};

const register = async (req, res) => {
  try {
    const { name, email, password, phone, collegeName, district } = req.body;

    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create new user
    const user = await User.create({
      name,
      email,
      password,
      phone,
      collegeName,
      district,
    });

    const token = generateToken(user._id);

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      collegeName: user.collegeName,
      district: user.district,
      role: user.role,
      token,
    });
  } catch (err) {
    console.error("❌ Registration error:", err);
    res
      .status(500)
      .json({ message: "Registration failed", error: err.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = generateToken(user._id);
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token,
    });
  } catch (err) {
    res.status(500).json({ message: "Login failed", error: err.message });
  }
};
const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ error: "User not found" });
    res.status(200).json(user);
  } catch (err) {
    console.error("❌ Profile fetch error:", err.message);
    res.status(500).json({ error: "Server error" });
  }
};

const updateProfile = async (req, res) => {
  try {
    const { name, phone, collegeName, district } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({ error: "Name is required" });
    }

    if (phone && !/^01[3-9]\d{8}$/.test(phone)) {
      return res.status(400).json({ error: "Invalid phone number" });
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      { name, phone, collegeName, district },
      { new: true, runValidators: true }
    ).select("-password");

    res.status(200).json(updatedUser);
  } catch (err) {
    console.error("❌ Profile update error:", err.message);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = {
  register,
  login,
  getProfile,
  updateProfile,
};
