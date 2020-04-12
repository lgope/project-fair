const express = require('express');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated, ensureUserIsManagement } = require('../config/auth');

// Welcome Page
router.get('/', ensureAuthenticated, ensureUserIsManagement, (req, res) => res.render('management/managementHomePage.ejs'));

module.exports = router;