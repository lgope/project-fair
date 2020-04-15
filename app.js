const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');
const keys = require('./config/keys');

const app = express();

// Passport Config
require('./config/passport')(passport);

// EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/views'));

// Express body parser
app.use(express.urlencoded({ extended: true }));

// Express session
app.use(
  session({
    secret: keys.sessionSecret,
    resave: true,
    saveUninitialized: true
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

// Global variables
app.use(function (req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

// Routes
app.use('/', require('./routes/index.js'));
app.use('/users', require('./routes/users.js'));
app.use('/student', require('./routes/student.js'));
app.use('/management', require('./routes/management'));

module.exports = app;
