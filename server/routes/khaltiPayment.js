// userRoutes.js

const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
var httprequest = require("request-promise");

router.post("/", authController.protect, (req, res) => {
  const { amount, purchase_order_id, purchase_order_name, khaltiDetails } =
    req.body;
  const options = {
    method: "POST",
    url: "https://dev.khalti.com/api/v2/epayment/initiate/",
    headers: {
      Authorization: `key ${process.env.KHALTI_SECRET_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      return_url: "https://tech-cart-nu.vercel.app//confirmation",
      website_url: "https://tech-cart-nu.vercel.app/",
      amount: amount * 100,
      purchase_order_id,
      purchase_order_name,
      customer_info: {
        name: khaltiDetails.name,
        email: khaltiDetails.email,
      },
    }),
  };
  httprequest(options)
    .then((result) => {
      res.status(200).send({
        status: 200,
        message: "Khalti payment initiated successfully",
        result: JSON.parse(result),
      });
    })
    .catch((err) => {
      console.log("Error", err);
      res.status(500).json({ error: "Error in Khalti payment" });
    });
});

module.exports = router;
