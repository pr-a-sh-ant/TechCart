const pool = require("../database/connection");

exports.getAllUsers = () => {
  return new Promise((resolve, reject) => {
    pool.query(
      "SELECT userId, email, isAdmin, fname, lname FROM users;",
      (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      }
    );
  });
};

exports.getUserById = (userId) => {
  return new Promise((resolve, reject) => {
    const query = "SELECT userId, isAdmin FROM users WHERE userId = ?";
    pool.query(query, [userId], (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};
