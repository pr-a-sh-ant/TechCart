const userModel = require("../models/userModel");

exports.getUsers = (req, res) => {
  userModel
    .getAllUsers()
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      console.error(err.message);
      res.status(400).send("Error fetching users.");
    });
};

exports.updateUserToAdmin = (req, res) => {
  const { id } = req.params;
  const { isAdmin } = req.body;
  userModel
    .updateUser(id, isAdmin)
    .then((result) => {
      res.status(201).send(result);
    })
    .catch((err) => {
      console.error(err.message);
      res.status(500).send("Error updating user.");
    });
};

exports.deleteUser = (req, res) => {
  const { id } = req.params;
  userModel
    .deleteUser(id)
    .then((result) => {
      res.status(201).send({ message: "User Deleted Scuessfully" });
    })
    .catch((err) => {
      console.error(err.message);
      res
        .status(400)
        .send({ statusId: 400, message: "Error processing this request" });
    });
};
