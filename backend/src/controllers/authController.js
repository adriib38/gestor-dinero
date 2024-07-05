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
      created: false,
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
        created: true,
        message: "User created",
        user: user,
        token: token,
      });
    } else {
      // User already exists
      if (err.code === "ER_DUP_ENTRY") {
        return res
          .status(409)
          .json({ created: false, message: err.sqlMessage });
      }

      // Send the error if there was one while creating the user
      return res
        .status(500)
        .json({ message: "Error creating user", error: err });
    }
  });
};

module.exports = {
  signup,
};
