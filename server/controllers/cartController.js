// cartController.js

const cartModel = require("../models/cartModel");
const { verifyToken } = require("../utils/token");

exports.getShoppingCart = (req, res) => {
  const userId = req.params.userId;
  cartModel
    .getShoppingCart(userId)
    .then((result) => {
      res.status(201).send(result);
    })
    .catch((err) => {
      console.error(err.message);
      res.status(500).send("Error fetching shopping cart.");
    });
};

exports.addToCart = (req, res) => {
  const { customerId, productId, quantity } = req.body;
  cartModel
    .addToCart(customerId, productId, quantity)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.error(err.message);
      res.status(500).send("Error adding product to cart.");
    });
};

exports.removeFromCart = (req, res) => {
  const productId = req.params.productId;
  const userId = req.params.userId;
  cartModel
    .removeFromCart(productId, userId)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.error(err.message);
      res.status(500).send("Error removing product from cart.");
    });
};

exports.buy = (req, res) => {
  const customerId = req.params.id;
  const address = req.body.address;
  const phoneNumber = req.body.phoneNumber;

  cartModel
    .buy(customerId, address, phoneNumber)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.error(err.message);
      res.status(500).send("Error removing product from cart.");
    });
};
