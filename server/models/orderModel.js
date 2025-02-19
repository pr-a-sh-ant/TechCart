// orderModel.js

const pool = require("../database/connection");
exports.getAllOrders = () => {
  return new Promise((resolve, reject) => {
    pool.query(
      "SELECT O.orderId, P.name, U.fname, C.name as category, U.lname, O.createdDate, O.totalPrice " +
        "FROM orders O INNER JOIN users U ON O.userId = U.userId " +
        "INNER JOIN productsInOrder PIN ON O.orderId = PIN.orderId " +
        "INNER JOIN product P ON PIN.productId = P.productId " +
        "INNER JOIN category C ON P.categoryId = C.categoryId;",
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

exports.getPastOrdersByCustomerID = (orderId) => {
  const query =
    "SELECT O.orderId, P.name, O.createdDate, PIN.quantity, PIN.totalPrice " +
    "FROM orders O INNER JOIN productsInOrder PIN ON O.orderId = PIN.orderId  " +
    "INNER JOIN product P ON PIN.productId = P.productId " +
    "WHERE O.userId = ? " +
    "ORDER BY O.orderID DESC;";
  return new Promise((resolve, reject) => {
    pool.query(query, [orderId], (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

exports.deleteOrder = (orderId) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "DELETE FROM productsInOrder WHERE orderId = ?;",
      [orderId],
      (err) => {
        if (err) {
          reject(err);
        } else {
          pool.query(
            "DELETE FROM orders WHERE orderId = ?;",
            [orderId],
            (err) => {
              if (err) {
                reject(err);
              } else {
                resolve();
              }
            }
          );
        }
      }
    );
  });
};
