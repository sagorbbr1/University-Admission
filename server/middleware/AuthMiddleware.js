const jwt = require("jsonwebtoken");
const User = require("../models/UserModel.js");

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.id).select("-password");

      if (!req.user) {
        return res.status(401).json({ message: "User not found" });
      }

      return next(); // ✅ success
    } catch (err) {
      console.error("❌ Token verification failed:", err.message);
      return res.status(401).json({ message: "Unauthorized, token failed" });
    }
  }

  // 🟥 This block runs if no token at all
  return res.status(401).json({ message: "No token, authorization denied" });
};

module.exports = { protect };
