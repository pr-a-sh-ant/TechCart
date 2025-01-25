// productRoutes.js

const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const authController = require("../controllers/authController");

// Route to get all products
router.get("/", productController.getAllProducts);

// Route to get all products by category
router.get("/category/:category", productController.getProductsByCategory);

// Route to get all categories
router.get("/category", productController.getAllCategory);

// Route to get all categories
router.get("/categoryproduct", productController.getAllCategoriesWithProduct);

// Route to get product details by ID
router.get("/:id", productController.getProductDetailsById);

// Route to get all orders product details by ID
router.get("/allOrderByProductId/:id", productController.allOrderByProductId);

// Route to create a new product
router.post(
  "/create",
  authController.protect,
  authController.restrictTo,
  productController.createProduct
);

// Route to update an existing product
router.post("/update", authController.protect, productController.updateProduct);

// Route to delete a product by ID
router.delete(
  "/delete/:id",
  authController.protect,
  productController.deleteProduct
);

module.exports = router;
