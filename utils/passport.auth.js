const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user.model');
const index = require('../controllers/index')

//We have used Local Strategy here 
passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
    },
    async (email, password, done) => {
      try {
        const user = await User.findOne({ email });
        // Username/email does NOT exist
        if (!user) {
          return done(null, false, {
            message: 'Username/email not registered',
          });
        }
        // Email exist and now we need to verify the password
        const isMatch = await user.isValidPassword(password);
        return isMatch
          ? done(null, user)
          : done(null, false, { message: 'Username/Password is incorrect' });
      } catch (error) {
        done(error);
      }
    }
  )
);

//Here we are adding user id to req
passport.serializeUser(function (user, done) {
  done(null, user.id);
});

//Here we are adding user object to req
passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});


