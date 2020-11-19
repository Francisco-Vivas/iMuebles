const express = require("express");
const passport = require("passport");
const router = express.Router();
const User = require("../models/User");

// Bcrypt to encrypt passwords
const bcrypt = require("bcrypt");

//configs
const {sendEmail} = require('../configs/nodemailer');

//controllers
const { googleInit, googleCb } = require("../controllers/google.controller");
const {facebookInit, facebookCb} = require ("../controllers/facebook.controller")
const { createNewCart } = require("../controllers/cart.controller");

const bcryptSalt = 10;

router.get("/login", (req, res, next) => {
  res.render("auth/login", { message: req.flash("error") });
});

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/auth/login",
    failureFlash: true,
    passReqToCallback: true,
  })
);

router.get("/signup", (req, res, next) => {
  res.render("auth/signup");
});

router.post("/signup", (req, res, next) => {
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  if (email === "" || password === "") {
    res.render("auth/signup", { message: "Indicate email and password" });
    return;
  }

  User.findOne({ email }, "email", (err, user) => {
    if (user !== null) {
      res.render("auth/signup", { message: "The email already exists" });
      return;
    }

    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);

    let cartId;
    createNewCart().then((id) => (cartId = id));

    const newUser = new User({
      cartId,
      username,
      email,
      password: hashPass,
    });
  
    newUser
      .save()
      .then(() => {
        sendEmail(newUser.username, newUser.email, 'Bienvenido a iMuebles', 'Gracias por unirte a nuestra familia')
        res.redirect("/");
      })
      .catch((err) => {
        res.render("auth/signup", { message: "Something went wrong" });
      });
  });
});

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

router.get("/google", googleInit)
router.get("/google/callback", googleCb)

router.get('/facebook', facebookInit)
router.get('/facebook/callback', facebookCb)

module.exports = router;