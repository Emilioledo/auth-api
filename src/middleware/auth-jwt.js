const jwt = require("jsonwebtoken");
const User = require("../models/User");
require("dotenv").config();

const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers["x-access-token"];
    if (!token) {
      return res.status(403).json({ msg: "No token provided" });
    }
    const decoded = jwt.verify(token, process.env.SECRET_JWT);
    req.userId = decoded.id;
    const user = await User.findById(req.userId, { password: 0 });
    if (!user) {
      return res.status(404).json({ msg: "Invalid token" });
    }
    next();
  } catch (error) {
    return res.status(401).json({ msg: "Unauthorized" });
  }
};

module.exports = { verifyToken };
