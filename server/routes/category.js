const express = require("express");
const router = express.Router();
const db = require("../database"); // Adjust path to your database connection

// GET /api/categories
router.get("/", (req, res) => {
  const query = "SELECT * FROM category";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching categories:", err);
      res.status(500).json({ error: "Failed to fetch categories" });
    } else {
      res.status(200).json(results);
    }
  });
});

module.exports = router;
