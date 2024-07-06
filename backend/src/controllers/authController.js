const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { validateUserFields } = require("../utils/validators");

require("dotenv").config();

const signup = async (req, res) => {
  let { username, password } = req.body;

  //Format the data
  username = username.toLowerCase().trim().replace(/\s+/g, "");
  password = password.trim();
  const user = new User({ username, password });

  const { valid, errors } = validateUserFields(user);

  if (!valid) {
    return res.status(400).json({
      message: errors,
    });
  }

  password = await user.encryptPassword();

  User.createUser(user, (err, results) => {
    if (!err) {
      // Create a token
      let token = jwt.sign({ id: user.uuid }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });

      return res.status(201).json({
        message: "User created",
        user: user,
        token: token,
      });
    } else {
      // User already exists
      if (err.code === "ER_DUP_ENTRY") {
        return res
          .status(409)
          .json({ message: err.sqlMessage });
      }

      // Send the error if there was one while creating the user
      return res
        .status(500)
        .json({ message: "Error creating user", error: err });
    }
  });
};

const signin = async (req, res) => {
  const { username, password } = req.body;

  User.getUserByUsername(username, async (err, results) => {
    if (err) {
      // Send the error if there was one
      return res
        .status(500)
        .json({ message: "Error getting user", error: err });
    }

    if(results == undefined){
      return res
        .status(404)
        .json({ message: "User not found" });
    }

    const correctPassword = await User.validatePassword(
      password,
      results.password
    );

    // If the password is valid
    if (correctPassword) {
      // Create a token inside the callback
      let token = jwt.sign({ id: results.uuid }, process.env.JWT_SECRET, {
        expiresIn: "1h"
      });

      res.status(201).json({ user: results, token: token });
    } else {
      res.status(401).json({ message: "Invalid password" });
    }
  });
};

module.exports = {
  signup,
  signin
};
