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

router.patch(
  "/updateOrderStatus/:id",
  authController.protect,
  authController.restrictTo,
  orderController.updateOrderStatus
);

router.patch(
  "/cancelOrder/:id",
  authController.protect,
  orderController.cancelOrder
);

router.patch(
  "/paidOrder/:id",
  authController.protect,
  authController.restrictTo,
  orderController.paidOrder
);

router.delete(
  "/delete/:id",
  authController.protect,
  authController.restrictTo,
  orderController.deleteOrder
);

module.exports = router;
