const jwt = require("jsonwebtoken");
require("dotenv").config();

// Middleware to verify the token

//Get jwt from cookies
function verifyToken(req, res, next) {
  try {
    let token = req.cookies.access_token
    
    if (!token) {
      return res.status(403).json({ message: "No token provided" });
    }
  
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userUuid = decoded.id;

    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized", err: error });
  }
}

// function verifyToken(req, res, next) {
//   let auth = req.get("Authorization");

//   if (!auth) {
//     return res.status(403).json({ message: "No token provided" });
//   }

//   try {
//     token = req.get("Authorization").split(" ")[1];
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.userUuid = decoded.id;

//     next();
//   } catch (error) {
//     return res.status(401).json({ message: "Unauthorized" });
//   }
// }

module.exports = verifyToken;
