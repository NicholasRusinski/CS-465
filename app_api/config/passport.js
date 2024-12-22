const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
require('../models/user');
const User = mongoose.model('User');

passport.use(new LocalStrategy({
  usernameField: 'email'
}, async (username, password, done) => {
  const user = await User.findOne({ email: username }).exec();

  if (!user) {
    return done(null, false, { message: 'Incorrect username' });
  }

  if (!user.validPassword(password)) {
    return done(null, false, { message: 'Incorrect password' });
  }

  return done(null, user);
}));