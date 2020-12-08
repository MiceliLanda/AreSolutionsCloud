const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const Usuario = require('../models/user');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const user = await Usuario.findById(id);
  done(null, user);
});

passport.use('register', new LocalStrategy({
  usernameField: 'username',
  passwordField: 'password',
  passReqToCallback: true
}, async (req, username, password, done) => {
  const user = await Usuario.findOne({'username': username})
  console.log(user)
  if(user) {
    return done(null, false, req.flash('registerMessage', 'The username is already Taken.'));
  } else {
    const newUser = new Usuario();
    newUser.username = username;
    newUser.password = newUser.encryptPassword(password);
    console.log(newUser)
    await newUser.save();
    done(null, newUser);
  }
}));

passport.use('login', new LocalStrategy({
  usernameField: 'username',
  passwordField: 'password',
  passReqToCallback: true
}, async (req, username, password, done) => {
  const user = await Usuario.findOne({username: username});
  if(!user) {
    return done(null, false, req.flash('loginMessage', 'No User Found'));
  }
  if(!user.comparePassword(password)) {
    return done(null, false, req.flash('loginMessage', 'Incorrect Password'));
  }
  return done(null, user);
}));