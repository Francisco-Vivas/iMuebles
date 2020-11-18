const FacebookStrategy = require('passport-facebook');
const passport = require("passport");
const User = require("../models/User");
const { sendEmail } = require('../configs/nodemailer')

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_ID,
      clientSecret: process.env.FACEBOOK_SECRET,
      callbackURL: '/auth/facebook/callback',
      profileFields: ['id', 'email', 'name'],
    },
    async (_,__ , profile, callback) => {
      const user = await User.findOne({ facebookId: profile.id })
      if (!user) {
        const userCreated = await User.create({
          name: `${profile.name.givenName} ${profile.name.familyName}`,
          facebookId: profile.id,
          email: profile.emails[0].value,
        })
        sendEmail(userCreated.username, userCreated.email, 'Bienvenido a iMuebles', 'Gracias por unirte a nuestra familia');
        return callback(null, userCreated)
      } else {
        callback(null, user)
      }
    }
  )
)
