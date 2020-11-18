const passport = require("passport");

exports.facebookInit = passport.authenticate('facebook', { scope: ['email'] })

exports.facebookCb = passport.authenticate('facebook', {
  successRedirect: '/user/profile',
  failureRedirect: '/login',
  scope: ['email'],
})