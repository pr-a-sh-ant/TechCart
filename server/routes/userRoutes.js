// userRoutes.js

const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authController = require("../controllers/authController");

// Route for admin get all user
router.get(
  "/getuser",
  authController.protect,
  authController.restrictTo,
  userController.getUsers
);

//Route for admin to update user to admin
router.post(
  "/update/:id",
  authController.protect,
  authController.restrictTo,
  userController.updateUserToAdmin
);

// Router for admin to delete user
router.delete(
  "/:id",
  authController.protect,
  authController.restrictTo,
  userController.deleteUser
);

module.exports = router;
