const express = require("express");
const passport = require("passport");
const router = express.Router();
const User = require("../models/User");
const { profilePicture } = require("../configs/cloudinary.configs");
// Bcrypt to encrypt passwords
const bcrypt = require("bcrypt");

//configs
const { sendBienvenida } = require("../configs/nodemailer");

//controllers
const { googleInit, googleCb } = require("../controllers/google.controller");
const {
  facebookInit,
  facebookCb,
} = require("../controllers/facebook.controller");
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

router.post(
  "/signup",
  profilePicture.single("pictureInputURL"),
  (req, res, next) => {
    const { username, email, password, userlastname } = req.body;

    if (email === "" || password === "") {
      res.render("auth/signup", {
        message: "Verifique que las credenciales ya estén bien",
      });
      return;
    }

    User.findOne({ email }, "email", (err, user) => {
      if (user !== null) {
        res.render("auth/signup", { message: "Este correo ya existe." });
        return;
      }

      const salt = bcrypt.genSaltSync(bcryptSalt);
      const hashPass = bcrypt.hashSync(password, salt);

      let pictureURL;
      if (req.file) {
        pictureURL = req.file.path;
      } else {
        pictureURL =
          "https://www.flaticon.com/svg/static/icons/svg/847/847969.svg";
      }

      createNewCart().then((cartId) => {
        const newUser = new User({
          cartId,
          username,
          userlastname,
          email,
          password: hashPass,
          pictureURL,
        });

        newUser
          .save()
          .then(() => {
            sendBienvenida(newUser);
            res.redirect("/auth/login");
          })
          .catch((err) => {
            res.render("auth/signup", { message: "Algo pasó :(" });
          });
      });
    });
  }
);

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

router.get("/google", googleInit);
router.get("/google/callback", googleCb);

router.get("/facebook", facebookInit);
router.get("/facebook/callback", facebookCb);

module.exports = router;
