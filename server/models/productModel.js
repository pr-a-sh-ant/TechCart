// productModel.js

const pool = require("../database/connection");

exports.getAllProducts = () => {
  return new Promise((resolve, reject) => {
    pool.query("SELECT * FROM product;", (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

exports.getAllCategories = () => {
  return new Promise((resolve, reject) => {
    pool.query("SELECT * FROM category;", (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

exports.getAllCategoriesWithProducts = () => {
  return new Promise((resolve, reject) => {
    const query = `
      SELECT c.categoryID, c.name as categoryName, p.productId, p.name as productName, p.price, p.description
      FROM category c
      LEFT JOIN product p ON c.categoryID = p.categoryId;
    `;
    pool.query(query, (err, result) => {
      if (err) {
        reject(err);
      } else {
        const categories = {};
        result.forEach((row) => {
          if (!categories[row.categoryID]) {
            categories[row.categoryID] = {
              categoryID: row.categoryID,
              categoryName: row.categoryName,
              products: [],
            };
          }
          if (row.productId) {
            categories[row.categoryID].products.push({
              productId: row.productId,
              productName: row.productName,
              price: row.price,
              description: row.description,
            });
          }
        });
        resolve(Object.values(categories));
      }
    });
  });
};

exports.getProductsByCategory = (category) => {
  return new Promise((resolve, reject) => {
    const query =
      "SELECT p.* FROM product p INNER JOIN category c on product.categoryId = category.categoryID WHERE category.name = ?";
    pool.query(query, [category], (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

exports.getProductDetailsById = (productId) => {
  return new Promise((resolve, reject) => {
    const query = "SELECT * FROM product WHERE productId = ?";
    pool.query(query, [productId], (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

exports.allOrderByProductId = (productId) => {
  return new Promise((resolve, reject) => {
    const query =
      "SELECT O.orderId, U.fname, U.lname, O.createdDate, PIN.quantity, PIN.totalPrice " +
      "FROM users U INNER JOIN orders O on U.userId  = O.userId " +
      "INNER JOIN productsInOrder PIN on O.orderId = PIN.orderId " +
      "INNER JOIN product P on PIN.productId = P.productId " +
      "WHERE PIN.productId = ?;";

    pool.query(query, [productId], (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

exports.createProduct = (name, price, description, categoryId, imageURL) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "INSERT INTO product (name, price, description, categoryId, image) VALUES (?,?,?,?,?);",
      [name, price, description, categoryId, imageURL],
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

exports.updateProduct = (productId, name, price, description) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "UPDATE product SET name = ?, price = ?, description = ? WHERE productId = ?",
      [name, price, description, productId],
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

exports.deleteProduct = (productId) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "DELETE FROM product WHERE productId = ?",
      [productId],
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
