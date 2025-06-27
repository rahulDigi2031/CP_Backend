const jwt = require("jsonwebtoken");
const User = require("../Models/User");

const authenticateUser = async (req, res, next) => {
  try {
    const token = req.cookies.token || req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return res.status(401).json({ success: false, message: "Access denied. No token provided." });
    }


    // Verify token
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const user = await User.findById(decoded.userId).select("-password");
    

    if (!user) {
      return res.status(401).json({ success: false, message: "Invalid token or user not found." });
    }

    req.user = user; // Attach user to request
    next();
  } catch (error) {
    res.status(401).json({ success: false, message: "Unauthorized access." });
  }
};

module.exports = {authenticateUser};
