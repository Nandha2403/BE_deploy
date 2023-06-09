const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { UserModel } = require("../model/user.model");
require("dotenv").config();

const userRouter = express.Router();

userRouter.post("/register", async (req, res) => {
  // logic
  const { name, email, password } = req.body;
  try {
    bcrypt.hash(password, 5, async (err, hash) => {
      if (err) {
        res.status(400).json({ err: err.message });
      }
      const user = new UserModel({ name, email, password: hash });
      await user.save();
    });
    res.status(200).json({ msg: "User has been Updated", user: req.body });
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
});

userRouter.post("/login", async (req, res) => {
  // logic
  const { email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email });
    if (user) {
      bcrypt.compare(password, user.password, (err, result) => {
        if (result) {
          const token = jwt.sign(
            { userID: user._id, user: user.name },
            process.env.secret
          );
          res.status(200).json({ msg: "Logged In!!", token });
        } else {
          res.status(400).json({ msg: "Wrong Credentials" });
        }
      });
    } else {
      res.status(200).json({ msg: "User does not exist" });
    }
  } catch (error) {
    res.status(400).json({ err: err.message });
  }
});

module.exports = {
  userRouter,
};
