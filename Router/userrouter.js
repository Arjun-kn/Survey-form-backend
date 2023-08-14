const express = require("express");
const bcrypt = require("bcrypt");
require("dotenv").config();
const jwt = require("jsonwebtoken");

const userRouter = express.Router();
const { register } = require("../models/usermodel");

userRouter.post("/register", async (req, res) => {
  const { name, email, phone, profession, password } = req.body;
  if (!name || !email || !phone || !profession || !password) {
    return res.status(400).send("All fields are required");
  }
  register
    .findOne({ email: email })
    .then((user) => {
      if (user) {
        return res.status(409).send("User already exists");
      } else {
        bcrypt.hash(password, 10).then((hashPassword) => {
          const user = new register({
            name,
            email,
            phone,
            profession,
            password: hashPassword,
          });
          user
            .save()
            .then((newUser) => {
              res.status(201).json({ message: "User registered successfully" });
            })
            .catch((err) => {
              console.log(err.message);
              res.status(500).send("Internal Server Error");
            });
        });
      }
    })
    .catch((err) => {
      console.log(err.message);
      res.status(500).send("Internal Server Error");
    });
});

userRouter.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json("All fields are required");
  }
  register
    .findOne({ email: email })
    .then((user) => {
      if (!user) {
        return res.status(404).json("User not found");
      }
      bcrypt
        .compare(password, user.password)
        .then((isMatch) => {
          if (!isMatch) {
            return res.status(401).json("Invalid email/password");
          }
          const token = jwt.sign(
            { id: user._id, email: user.email },
            process.env.Skey
          );
          res.status(200).json(token);
        })
        .catch((err) => {
          console.log(err);
          res.status(500).send("Internal Server Error");
        });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("Internal Server Error");
    });
});

module.exports = userRouter;
