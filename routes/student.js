const express = require('express');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated, ensureUserIsStudent } = require('../config/auth');

// Welcome Page
router.get('/', ensureAuthenticated, ensureUserIsStudent, (req, res) => res.render('student/studentHomePage.ejs'));

module.exports = router;