const jwt = require("jsonwebtoken");
const { User } = require("../models");

const Authenticate = async (req, res, next) => {
  try {
    const authHeader = req.header("Authorization");
    if (!authHeader) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader; 
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "secretkey");

    const user = await User.findByPk(decoded.id);
    if (!user) return res.status(401).json({ message: "User not found" });

    req.user = user; 
    next();
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized", error: err.message });
  }
};

const Authorize = (roles = []) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: `Access denied: Only ${roles.join(", ")} allowed` });
    }
    next();
  };
};

module.exports = { Authenticate, Authorize };
