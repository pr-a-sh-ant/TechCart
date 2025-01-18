// userRoutes.js

const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authController = require("../controllers/authController");

// Route for admin get all user
router.get("/getuser", authController.protect, userController.getUsers);

module.exports = router;
