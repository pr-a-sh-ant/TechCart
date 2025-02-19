// orderRoutes.js

const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");
const authController = require("../controllers/authController");

// Route to get all orders
router.get(
  "/",
  authController.protect,
  authController.restrictTo,
  orderController.getAllOrders
);

// Route to get past orders by customerId
router.get(
  "/myPastOrders/:id",
  authController.protect,
  orderController.getPastOrdersByCustomerID
);

module.exports = router;
