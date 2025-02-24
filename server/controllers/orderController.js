// orderController.js

const orderModel = require("../models/orderModel");

exports.getAllOrders = (req, res) => {
  orderModel
    .getAllOrders()
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      res.status(500).send("Error fetching orders.");
    });
};

exports.getPastOrdersByCustomerID = (req, res) => {
  const orderId = req.params.id;
  orderModel
    .getPastOrdersByCustomerID(orderId)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.status(500).send("Geeting past orders failed.");
    });
};

exports.deleteOrder = (req, res) => {
  const orderId = req.params.id;
  orderModel
    .deleteOrder(orderId)
    .then(() => {
      res.status(204).send();
    })
    .catch((err) => {
      console.error(err.message);
      res.status(500).send(err.message);
    });
};
