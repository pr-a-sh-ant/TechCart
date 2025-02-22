// userRoutes.js

const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const cloudinary = require("cloudinary");

router.post("/", (req, res) => {
  const timestamp = Math.round(new Date().getTime() / 1000);
  const signature = cloudinary.utils.api_sign_request(
    {
      timestamp: timestamp,
    },
    process.env.CLOUDINARY_SECRET
  );
  return res.status(201).send({ statusId: 201, timestamp, signature });
});

module.exports = router;
