const GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("passport");
const { createNewCart } = require("../controllers/cart.controller");
const User = require("../models/User");
const {sendEmail} = require('../configs/nodemailer')

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      callbackURL: "/auth/google/callback",
    },
    async (_, __, profile, done) => {
      try {
        const user = await User.findOne({ googleID: profile.id });
        if (user) {
          return done(null, user);
        }

        const cartId = await createNewCart();

        const newUser = await User.create({
          username: profile.displayName,
          cartId,
          email: profile.emails[0].value,
          googleID: profile.id,
        });
        sendEmail(newUser.username, newUser.email, 'Bienvenido a iMuebles', 'Gracias por unirte a nuestra familia');
        done(null, newUser);
      } catch (err) {
        done(err);
      }
    }
  )
);
