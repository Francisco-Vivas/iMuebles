const GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("passport");
const { createNewCart } = require("../controllers/cart.controller");
const User = require("../models/User");
const { sendBienvenida } = require("../configs/nodemailer");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      callbackURL: "/auth/google/callback",
    },
    async (_, __, profile, done) => {
      try {
        console.log(profile);
        const user = await User.findOne({ googleID: profile.id });
        if (user) {
          return done(null, user);
        }

        const cartId = await createNewCart();

        const newUser = await User.create({
          username: profile.name.givenName,
          userlastname: profile.name.familyName,
          pictureURL: profile.photos[0].value,
          cartId,
          email: profile.emails[0].value,
          googleID: profile.id,
        });
        sendBienvenida(newUser);
        done(null, newUser);
      } catch (err) {
        done(err);
      }
    }
  )
);
