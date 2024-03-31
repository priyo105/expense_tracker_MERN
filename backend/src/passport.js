const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth2").Strategy;
require("dotenv/config");

const GOOGLE_CLIENT_ID =
  "737982624310-c8q93rijr0ljp0othcq3v7r17eq59ln1.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET = "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";

passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser(function (user, done) {
  done(null, user);
});

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID, // Your Credentials here.
      clientSecret: GOOGLE_CLIENT_SECRET, // Your Credentials here.
      callbackURL: process.env.CALLBACK_URL + "/auth/callback",
      passReqToCallback: true,
    },
    function (request, accessToken, refreshToken, profile, done) {
      return done(null, profile);
    }
  )
);
