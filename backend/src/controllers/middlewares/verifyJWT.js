const jwt = require("jsonwebtoken");
require("dotenv").config();

// To-do: get jwt from cookies

// Middleware to verify the token
function verifyToken(req, res, next) {
  console.log('verifyToken')
  let auth = req.get("Authorization");

  if (!auth) {
    return res.status(403).json({ message: "No token provided" });
  }

  try {
    token = req.get("Authorization").split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userUuid = decoded.id;

    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
}

module.exports = verifyToken;
