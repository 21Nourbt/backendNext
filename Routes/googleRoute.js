const express = require('express');
const passport = require('passport');
const { createSendToken } = require('./../Controllers/authController');

const userRouter = express.Router();

// Google OAuth Route
userRouter.get("/auth/google", passport.authenticate("google", {
  scope: ["profile", "email", "https://www.googleapis.com/auth/user.phonenumbers.read"]
}));

// Google OAuth Callback
userRouter.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "http://localhost:3000/login",
    session: true
  }),
  (req, res) => {
    if (!req.user) {
      return res.redirect("http://localhost:3000/login");
    }

    createSendToken(req.user, 200, res); // Set JWT cookie
    res.redirect("http://localhost:3000/profile"); // Redirect to homepage after login
  }
);

module.exports = userRouter;