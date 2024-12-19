const jwt = require("jsonwebtoken");

const getUserIdFromToken = (req) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const userId = decoded.userId;
  return userId;
};

module.exports = { getUserIdFromToken };
