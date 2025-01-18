const userModel = require("../models/userModel");

exports.getUsers = (req, res) => {
  const { userId } = req.user;
  userModel
    .getAllUsers(userId)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.error(err.message);
      res.status(500).send("Error fetching users.");
    });
};
