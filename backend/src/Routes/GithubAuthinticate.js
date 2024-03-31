const passport = require("passport");
require("../passport.js");
require("dotenv/config");

const express = require("express");
const app = express.Router();
const session = require("express-session");
const bcrypt = require("bcryptjs");
const { User } = require("../Models/User.js");
const jwt = require("jsonwebtoken");

//Middelwares
app.use(
  session({
    secret: "axxxaaaxasasasas", // Replace with a strong, random string
    resave: false,
    saveUninitialized: true,
  })
);

const generateToken = (user) => {
  let secretkey = process.env.secret;
  let token = jwt.sign(
    {
      userId: user._id,
    },
    secretkey,
    { expiresIn: "1d" }
  );
  return token;
};

app.use(passport.initialize());
app.use(passport.session());

var GitHubStrategy = require("passport-github").Strategy;

passport.use(
  new GitHubStrategy(
    {
      clientID: "24ffe5d9e303d48c96a8",
      clientSecret: "a924c8495957c501f4ff666113c6eb077cb0d3cb",
      callbackURL: process.env.CALLBACK_URL + "/auth/authgit",
    },
    function (accessToken, refreshToken, profile, cb) {
      console.log("baal");
      return cb(null, profile);
    }
  )
);

app.get("/auth/github", passport.authenticate("github"));
app.get(
  "/auth/authgit",
  passport.authenticate("github", { failureRedirect: "/login" }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect("/auth/github/callback/success");
  }
);

// Success
app.get("/auth/github/callback/success", async (req, res) => {
  if (!req.user) {
    res.redirect("/auth/callback/failure");
    return; // Ensure the code doesn't continue after the redirect
  }
  //mongo insert
  let userAlreadyExists = await User.findOne({
    email: req.user.emails[0].value,
  });
  if (!userAlreadyExists) {
    //insert
    let userdata = {
      name: req.user.displayName,
      email: req.user.emails[0].value,
      isSocialMediaAuth: true,
    };
    userdata.passwordHash = await bcrypt.hashSync("1234", 10); //hashing the password
    let user = new User(userdata);
    let token = generateToken(user);
    await user
      .save()
      .then((user) => {
        console.log("data", user);
        res.cookie("token", token);

        res.redirect(process.env.FRONTEND_URL + "/home?data=" + user._id);
      })
      .catch((e) => res.send(e));
  } else {
    let token = generateToken(userAlreadyExists);

    res.cookie("token", token);
    res.redirect(
      process.env.FRONTEND_URL + "/home?data=" + userAlreadyExists._id
    );
    // res.send(userAlreadyExists)
  }
});

// failure
app.get("/auth/callback/failure", (req, res) => {
  res.send("Error");
});

module.exports = app;
