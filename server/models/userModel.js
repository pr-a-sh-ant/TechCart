const pool = require("../database/connection");

exports.getAllUsers = () => {
  return new Promise((resolve, reject) => {
    pool.query(
      "SELECT userId, email, isAdmin, fname, lname FROM users where isAdmin = 0;",
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

exports.updateUser = (userId, isAdmin) => {
  return new Promise((resolve, reject) => {
    const query = "UPDATE users SET isAdmin = ? WHERE userId = ?";
    pool.query(query, [isAdmin, userId], (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

exports.deleteUser = (userId) => {
  return new Promise((resolve, reject) => {
    const query = "DELETE FROM users WHERE userId = ?";
    pool.query(query, [userId], (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};
