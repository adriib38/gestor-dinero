const db = require("../database");
const { v4: uuid } = require("uuid");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

class User {
  constructor(user) {
    this.uuid = uuid();
    this.username = user.username;
    this.password = user.password;
  }

  async encryptPassword() {
    const saltRounds = parseInt(process.env.SALT_ROUNDS, 10);
    this.password = bcrypt.hashSync(this.password, saltRounds)
  }
  
  static validatePassword(password, hashedPassword) {
    return bcrypt.compare(password, hashedPassword);
  }

  static createUser(user, callback) {
    const { uuid, username, password } = user;

    if (!username || !password) {
      const error = new Error("Missing required fields");
      console.log("Error creating user: ", error);
      return callback(error, null);
    }

    db.query(
      "INSERT INTO users (uuid, username, password) VALUES (?, ?, ?)",
      [uuid, username, password],
      (err, results) => {
        if (err) {
          console.error("Error creating user:", err);
          callback(err, null);
        } else {
          callback(null, results);
        }
      }
    );
  }

  static getUserByUsername(username, callback) {
    if (!username) {
      const error = new Error("Missing required fields");
      console.error("Error getting user:", error);
      return callback(error, null);
    }

    db.query(
      "SELECT * FROM users WHERE username = ?",
      [username],
      (err, results) => {
        if (err) {
          console.error("Error getting user:", err);
          return callback(err, null);
        } else {
          return callback(null, results[0]);
        }
      }
    );
  }

  static getUserByUuid(uuid, callback) {
    if (!uuid) {
      const error = new Error("Missing required fields");
      console.error("Error getting user:", error);
      return callback(error, null);
    }

    db.query(
      "SELECT username, created_at FROM users WHERE uuid = ?",
      [uuid],
      (err, results) => {
        if (err) {
          console.error("Error getting user:", err);
          return callback(err, null);
        } else {
          return callback(null, results[0]);
        }
      }
    );
  }
}

module.exports = User;
