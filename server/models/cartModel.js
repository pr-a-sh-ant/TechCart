// cartModel.js

const pool = require("../database/connection");

exports.getShoppingCart = (userId) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "SELECT S.quantity, P.name,P.image, P.price, P.productId FROM shopingCart S INNER JOIN product P ON S.productId = P.productId WHERE S.userId = ?",
      [userId],
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

exports.addToCart = (customerId, productId, quantity) => {
  return new Promise((resolve, reject) => {
    // Check if the product is already in the cart
    pool.query(
      "SELECT quantity FROM shopingCart WHERE productId = ? AND userId = ?",
      [productId, customerId],
      (err, result) => {
        if (err) {
          reject(err);
        } else if (result.length > 0) {
          // If product is already in the cart, update the quantity
          pool.query(
            "UPDATE shopingCart SET quantity = quantity + ? WHERE productId = ? AND userId = ?",
            [quantity, productId, customerId],
            (err, updateResult) => {
              if (err) {
                reject(err);
              } else {
                resolve(updateResult);
              }
            }
          );
        } else {
          // If product is not in the cart, insert it
          pool.query(
            "INSERT INTO shopingCart (userId, productId, quantity) VALUES (?, ?, ?)",
            [customerId, productId, quantity],
            (err, insertResult) => {
              if (err) {
                reject(err);
              } else {
                resolve(insertResult);
              }
            }
          );
        }
      }
    );
  });
};

exports.removeFromCart = (productId, userId) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "DELETE FROM shopingCart WHERE productId = ? AND userId = ?",
      [productId, userId],
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

exports.buy = (
  customerId,
  address,
  phoneNumber,
  status,
  paymentMethod,
  transactionId,
  paymentStatus
) => {
  return new Promise((resolve, reject) => {
    // Create order
    pool.query(
      "INSERT INTO orders (userId, address, phoneNumber, status, paymentMethod, transactionId, paymentStatus) VALUES (?, ?, ?, ?, ?, ? , ?);",
      [
        customerId,
        address,
        phoneNumber,
        status,
        paymentMethod,
        transactionId,
        paymentStatus,
      ],
      (err, orderResult) => {
        if (err) {
          reject(err);
        } else {
          // Move items from shopping cart to products in order
          pool.query(
            "INSERT INTO productsInOrder (orderId, productId, quantity, totalPrice) " +
              "SELECT (SELECT max(orderId) FROM orders WHERE userId = ?), S.productId, S.quantity, P.price * S.quantity " +
              "FROM shopingCart S INNER JOIN product P ON S.productId = P.productId " +
              "WHERE S.userId = ?;",
            [customerId, customerId],
            (err, productsResult) => {
              if (err) {
                reject(err);
              } else {
                // Update total price in order table
                pool.query(
                  "UPDATE orders O " +
                    "SET totalPrice = (SELECT SUM(P.totalPrice) " +
                    "FROM productsInOrder P " +
                    "WHERE O.orderId = P.orderId " +
                    "GROUP BY O.orderId) " +
                    "WHERE userId = ? AND totalPrice IS NULL;",
                  customerId,
                  (err, totalPriceResult) => {
                    if (err) {
                      reject(err);
                    } else {
                      // Clear shopping cart
                      pool.query(
                        "DELETE FROM shopingCart WHERE userId = ?;",
                        customerId,
                        (err, clearCartResult) => {
                          if (err) {
                            reject(err);
                          } else {
                            resolve({
                              orderResult,
                              productsResult,
                              totalPriceResult,
                              clearCartResult,
                            });
                          }
                        }
                      );
                    }
                  }
                );
              }
            }
          );
        }
      }
    );
  });
};
