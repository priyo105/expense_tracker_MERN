require("../passport.js");
require("dotenv/config");

const express = require("express");
const app = express.Router();
const bcrypt = require("bcryptjs");
const { User } = require("../Models/User.js");

app.post("/auth/signup", async (req, res) => {
  //mongo insert
  let userAlreadyExists = await User.findOne({ email: req.body.email });

  if (!userAlreadyExists) {
    //insert
    let userdata = {
      name: req.body.name,
      email: req.body.email,
      isSocialMediaAuth: false,
    };
    userdata.passwordHash = await bcrypt.hashSync(req.body.passwordHash, 10); //hashing the password
    let user = new User(userdata);
    await user
      .save()
      .then((user) => {
        res.status(200).send(user);
      })
      .catch((e) => res.send(e));
  } else {
    res.status(400).send("User Already Exist ! Change Email Address");
    // res.send(userAlreadyExists)
  }
});

app.post("/auth/signin", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).send("User not found");
    }
    const passwordMatch = await bcrypt.compare(
      req.body.password,
      user.passwordHash
    );
    if (!passwordMatch) {
      return res.status(401).send("Incorrect password");
    }
    res.status(200).send(user);
  } catch (error) {
    console.error("Error during sign-in:", error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = app;
