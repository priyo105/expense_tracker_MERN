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

app.use(passport.initialize());
app.use(passport.session());

//ROUTES

app.get("/", (req, res) => {
  res.send("<button><a href='/auth'>Login With Google</a></button>");
});

// Auth
app.get(
  "/auth",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

// Auth Callback
app.get(
  "/auth/callback",
  passport.authenticate("google", {
    successRedirect: "/auth/callback/success",
    failureRedirect: "/auth/callback/failure",
  })
);

const generateToken = (user) => {
  console.log(user);
  let secretkey = process.env.secret;
  let token = jwt.sign(
    {
      userId: user._id,
    },
    secretkey,
    { expiresIn: "1d" }
  );
  console.log(token);
  return token;
};

// Success
app.get("/auth/callback/success", async (req, res) => {
  if (!req.user) {
    res.redirect("/auth/callback/failure");
    return; // Ensure the code doesn't continue after the redirect
  }
  //mongo insert
  let userAlreadyExists = await User.findOne({ email: req.user.email });

  if (!userAlreadyExists) {
    //insert
    let userdata = {
      name: req.user.displayName,
      email: req.user.email,
      isSocialMediaAuth: true,
    };
    userdata.passwordHash = await bcrypt.hashSync("1234", 10); //hashing the password
    let user = new User(userdata);
    let token = await generateToken(user);
    await user
      .save()
      .then((user) => {
        console.log("data", user);
        res.cookie("token", token);
        res.redirect(process.env.FRONTEND_URL + "/home?data=" + user._id);
      })
      .catch((e) => res.send(e));
  } else {
    let token = await generateToken(userAlreadyExists);

    res.cookie("token", token, {
      domain: ".expense-tracker-mern-74at.onrender.com",
      path: "/",
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // Cookie expires in 24 hours
      httpOnly: true, // Prevent client-side access to the cookie
      secure: true, // Send the cookie only over HTTPS
      sameSite: "strict", // Prevent the cookie from being sent in cross-site requests
    });

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
