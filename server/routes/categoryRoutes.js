// productRoutes.js

const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const authController = require("../controllers/authController");

router.get("/", productController.getAllCategory);

// Route to create a new catergory
router.post(
  "/create",
  authController.protect,
  authController.restrictTo,
  productController.createCategory
);

router.delete(
  "/delete/:id",
  authController.protect,
  authController.restrictTo,
  productController.deleteCategory
);

module.exports = router;
