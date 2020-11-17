const GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("passport");
const User = require("../models/User");

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
        const newUser = await User.create({
          username: profile.displayName,
          email: profile.emails[0].value,
          googleID: profile.id,
        });
        done(null, newUser);
      } catch (err) {
        done(err);
      }
    }
  )
);
