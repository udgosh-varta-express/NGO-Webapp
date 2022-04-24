const express = require('express');
const createHttpError = require('http-errors');
const morgan = require('morgan');
const mongoose = require('mongoose');
const path = require('path')
require('dotenv').config();
require('../db/db-connection')
const session = require('../utils/session');
const cookieParser = require('cookie-parser')
const connectFlash = require('connect-flash');
const passport = require('passport');

const { ensureLoggedIn } = require('connect-ensure-login');
const { roles } = require('../utils/constants');


// Initialization
const app = express();
app.use(morgan('dev'));
app.use(express.static('public'));
app.set('views',path.join(__dirname,'../templates/views'));
app.set('view engine','ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser())

//Init Session
app.use(session)

// For Passport JS Authentication
app.use(passport.initialize());
app.use(passport.session());
require('../utils/passport.auth');

app.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});

// Connect Flash
app.use(connectFlash());
app.use((req, res, next) => {
  res.locals.messages = req.flash();
  next();
});

// Routes
app.use('/', require('../routes/index.route'));
app.use('/auth', require('../routes/auth.route'));
app.use(
  '/user',
  ensureLoggedIn({ redirectTo: '/auth/login' }),
  require('../routes/user.route')
);
app.use(
  '/admin',
  ensureLoggedIn({ redirectTo: '/auth/login' }),
  ensureAdmin,
  require('../routes/admin.route')
);

// 404 Handler
app.use((req, res, next) => {
  next(createHttpError.NotFound());
});

// Error Handler
app.use((error, req, res, next) => {
  error.status = error.status || 500;
  res.status(error.status);
  res.render('error_40x', {title:'Error', error });
});

// Setting the PORT
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 @ http://localhost:${PORT}`));



// Ensure That Admin routes Can be accessed by Admin only
function ensureAdmin(req, res, next) {
  if (req.user.role === roles.admin) {
    next();
  } else {
    req.flash('warning', 'you are not Authorized to see this route');
    res.redirect('/');
  }
}

// Ensure That Moderator routes Can be accessed by Moderator only
function ensureModerator(req, res, next) {
  if (req.user.role === roles.moderator) {
    next();
  } else {
    req.flash('warning', 'you are not Authorized to see this route');
    res.redirect('/');
  }
}
