const passport = require('passport');
const User = require('../models/User');


require('./serializers');
require('./localStrategy');
require('./googleStrategy');
require('./facebookStragety')

module.exports = (app)  => {
  app.use(passport.initialize());
  app.use(passport.session());
}


