// cartRoutes.js

const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController");
const authController = require("../controllers/authController");

// Route to get shopping cart for a user
router.get("/:userId", authController.protect, cartController.getShoppingCart);

// Route to add a product to the shopping cart
router.post("/add", authController.protect, cartController.addToCart);

// Route to remove a product from the shopping cart
router.delete(
  "/remove/:productId/:userId",
  authController.protect,
  cartController.removeFromCart
);

router.post("/buy/:id", authController.protect, cartController.buy);

module.exports = router;
