const passport = require("passport");

exports.googleInit = passport.authenticate("google", {
  scope: [
    "https://www.googleapis.com/auth/userinfo.profile",
    "https://www.googleapis.com/auth/userinfo.email",
  ],
});

exports.googleCb = passport.authenticate("google", {
  successRedirect: "/user/profile",
  failureRedirect: "/login",
});
