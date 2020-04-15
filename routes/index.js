const express = require('express');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');

// Welcome Page
router.get('/', forwardAuthenticated, (req, res) => res.render('welcome', { pageTitle: 'Project Fair' }));

// Dashboard
router.get('/dashboard', ensureAuthenticated, (req, res) => {
  // res.render('dashboard', {
  //   user: req.user
  // })
  if (req.user.role === 'student') {
    //   res.render('index.ejs', { name: req.user.name, role: req.user.role })
    res.redirect(`/student/${req.user.userName}`);
  } else if (req.user.role === 'management') {
    res.redirect(`/management/${req.user.userName}`);
  }
});

module.exports = router;
