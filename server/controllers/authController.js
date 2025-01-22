// userController.js

const authModel = require("../models/authModel");
const userModel = require("../models/userModel");
const AppError = require("../utils/appError");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");

exports.register = (req, res) => {
  const { email, password, isAdmin, fname, lname } = req.body;
  authModel
    .register(email, password, false, fname, lname)
    .then((result) => {
      console.log("Successful Register");
      res.status(201).send({ status: 201, data: result });
    })
    .catch((err) => {
      console.error(err.message);
      res.status(400).send({ status: 402, message: err.message });
    });
};

exports.login = (req, res) => {
  const { email, password } = req.body;
  authModel
    .login(email, password)
    .then((result) => {
      res.status(201).send({ result: result });
    })
    .catch((err) => {
      console.error(err.message);
      res.status(400).send("Error logging in.");
    });
};

exports.protect = async (req, res, next) => {
  //1)Getting token and check if it's there
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.jwt) {
    token = req.cookie.jwt;
  }

  if (!token) {
    res.status(401).send("Unauthorized: Missing or invalid token");
  }
  //2) Verification of token
  try {
    const decoded = await promisify(jwt.verify)(
      token,
      process.env.JWT_SECRET_KEY_ACCESS_TOKEN
    );
    //3) Check if user is Valid
    let currentUser;
    userModel
      .getUserById(decoded.userId)
      .then((result) => {
        console.log("result", result[0]);
        const currentUser = result[0];
        req.user = currentUser;
        next();
      })
      .catch((err) => {
        console.error(err.message);
        res.status(500).send({ status: 400, message: "Error fetching user." });
      });
  } catch (err) {
    res.status(401).send("Unauthorized: Expired or invalid token");
  }
};

exports.restrictTo = (req, res, next) => {
  if (req.user.isAdmin) {
    return next();
  } else {
    res.status(403).send({
      statusId: 403,
      status: "failed",
      message: "Forbidden: You are not authorized to perform this action",
    });
  }
};
