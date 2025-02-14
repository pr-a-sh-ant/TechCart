// database/connection.js
const mysql2 = require("mysql2");
require("dotenv").config(); // Load environment variables from .env file

let connectionParams;

// Use flag to toggle between localhost and server configurations
const useLocalhost = process.env.USE_LOCALHOST === "true";

if (useLocalhost) {
  console.log("Inside local");
  connectionParams = {
    user: "root",
    host: "localhost",
    password: "",
  };
} else {
  connectionParams = {
    user: process.env.DB_SERVER_USER,
    host: process.env.DB_SERVER_HOST,
    password: process.env.DB_SERVER_PASSWORD,
    database: process.env.DB_SERVER_DATABASE,
    port: process.env.DB_SERVER_PORT,
    ssl: {
      rejectUnauthorized: true,
      ca: process.env.DB_SERVER_CA,
    },
  };
}

const pool = mysql2.createConnection(connectionParams);

pool.on("error", (err) => {
  console.log("Database error:", err.message);
});

pool.connect((err) => {
  if (err) console.log(err.message);
  else console.log("DB Connection Done");
  // Check if the database exists

  pool.query("SHOW DATABASES LIKE 'ecommerce'", (err, result) => {
    if (err) {
      console.log("Error checking database existence:", err.message);
      return;
    }

    if (result.length === 0) {
      // Database does not exist, create it
      pool.query("CREATE DATABASE `ecommerce`", (err, result) => {
        if (err) {
          console.log("Error creating database:", err.message);
          return;
        }
        console.log("Database 'ecommerce' created");

        // Switch to the ecommerce database
        switchToEcommerceDatabase(() => {
          // Execute table creation and foreign key setup ONLY ONCE when the database is first created
          createTablesAndForeignKeys();
          pool.query("SHOW TABLES", (err, result) => {
            if (err) {
              console.log("Error checking table existence:", err.message);
              return;
            }
            console.log("Tables in ecommerce database:", result);
          });
        });
      });
    } else {
      // Database already exists, switch to it
      console.log("Database 'ecommerce' already exists");
      switchToEcommerceDatabase(); // Do NOT execute createTablesAndForeignKeys()
    }
  });
});

function switchToEcommerceDatabase(callback) {
  pool.changeUser({ database: "ecommerce" }, (err) => {
    if (err) {
      console.log("Error switching to database:", err.message);
      return;
    }
    console.log("Switched to 'ecommerce' database");

    // Execute the callback if provided
    if (callback) callback();
  });
}

function createTablesAndForeignKeys() {
  const queries = [
    `CREATE TABLE IF NOT EXISTS users (
      userId INT(5) AUTO_INCREMENT PRIMARY KEY,
      fname VARCHAR(30) NOT NULL,
      lname VARCHAR(30) NOT NULL,
      email VARCHAR(50),
      password VARCHAR(200),
      isAdmin BOOLEAN DEFAULT FALSE,
      createdDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`,
    `CREATE TABLE IF NOT EXISTS product (
      productId INT(5) AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(30) NOT NULL,
      description TINYTEXT,
      price DECIMAL(10,2),
      image MEDIUMTEXT,
      categoryId INT(5),
      createdDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`,
    `CREATE TABLE IF NOT EXISTS shopingCart (
      userId INT(5),
      productId INT(5),
      quantity INT,
      PRIMARY KEY (userId, productId)
    )`,
    `CREATE TABLE IF NOT EXISTS orders (
      orderId INT(10) AUTO_INCREMENT PRIMARY KEY,
      userId INT(5),
      address VARCHAR(500),
      phoneNumber BIGINT(10),
      totalPrice DECIMAL(10,2),
      createdDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`,
    `CREATE TABLE IF NOT EXISTS productsInOrder (
      orderId INT(5),
      productId INT(5),
      quantity INT,
      totalPrice DECIMAL(10,2),
      PRIMARY KEY (orderId, productId)
    )`,
    `CREATE TABLE IF NOT EXISTS category (
      categoryId INT(5) AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(30) NOT NULL,
      image MEDIUMTEXT
    )`,
    `ALTER TABLE shopingCart
     ADD FOREIGN KEY (userId) REFERENCES users (userId),
     ADD FOREIGN KEY (productId) REFERENCES product (productId)`,
    `ALTER TABLE orders
     ADD FOREIGN KEY (userId) REFERENCES users (userId)`,
    `ALTER TABLE productsInOrder
     ADD FOREIGN KEY (orderId) REFERENCES orders (orderId),
     ADD FOREIGN KEY (productId) REFERENCES product (productId)`,
    `ALTER TABLE product
     ADD FOREIGN KEY (categoryId) REFERENCES category (categoryId)`,
  ];

  // Execute each query sequentially
  queries.forEach((query, index) => {
    pool.query(query, (err, result) => {
      if (err) {
        console.log(`Error executing query ${index + 1}:`, err.message);
      } else {
        console.log(`Query ${index + 1} executed successfully`);
      }
    });
  });
}

// Export the pool
module.exports = pool;
