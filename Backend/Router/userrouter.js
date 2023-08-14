const express = require("express");
const bcrypt = require("bcrypt");
require("dotenv").config();
const jwt = require("jsonwebtoken");

const userRouter = express.Router();
const { register } = require("../models/usermodel");
//......................................................

userRouter.post("/register", async (req, res) => {
  const { name, email, phone, profession, password } = req.body;

  try {
    const existingUser = await register.findOne({ email: email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = new register({
      name,
      email,
      phone,
      profession,
      password: hashPassword,
    });

    await newUser.save();
    return res.status(200).json({ message: "User registered successfully" });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
});
//.................................................
userRouter.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json(`All fields are required`);
  }
  register
    .findOne({ email: email })
    .then((user) => {
      if (!user) {
        return res.status(404).json(`User not fount`);
      }
      bcrypt
        .compare(password, user.password)
        .then((isMatch) => {
          if (!isMatch) {
            return res.status(404).json(`Invalid email/password`);
          }
          const token = jwt.sign(
            { id: user._id, email: user.email },
            process.env.Skey
          );
          res.json(token);
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
});
module.exports = userRouter;

/**Updated */
