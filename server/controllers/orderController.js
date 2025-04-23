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
  const userId = req.params.id;
  orderModel
    .getPastOrdersByCustomerID(userId)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.status(500).send("Geeting past orders failed.");
    });
};

exports.updateOrderStatus = (req, res) => {
  const orderId = req.params.id;
  orderModel
    .updateOrderStatus(orderId)
    .then(() => {
      res.status(204).send();
    })
    .catch((err) => {
      console.error(err.message);
      res.status(500).send(err.message);
    });
};

exports.cancelOrder = (req, res) => {
  const orderId = req.params.id;
  orderModel
    .cancelOrder(orderId)
    .then(() => {
      res.status(204).send();
    })
    .catch((err) => {
      console.error(err.message);
      res.status(500).send(err.message);
    });
};

exports.paidOrder = (req, res) => {
  const orderId = req.params.id;
  orderModel
    .paidOrder(orderId)
    .then(() => {
      res.status(204).send();
    })
    .catch((err) => {
      console.error(err.message);
      res.status(500).send(err.message);
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
