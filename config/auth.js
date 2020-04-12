module.exports = {
  ensureAuthenticated: function(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    req.flash('error_msg', 'Please log in to view that resource');
    res.redirect('/users/login');
  },
  forwardAuthenticated: function(req, res, next) {
    if (!req.isAuthenticated()) {
      return next();
    }
    res.redirect('/dashboard');      
  },
  ensureUserIsManagement: function(req, res, next) {
    if (req.user.role === 'management') {
      return next();
    }
   res.redirect('/dashboard');
  },
  ensureUserIsStudent: function(req, res, next) {
    if (req.user.role === 'student') {
      return next();
    }
   res.redirect('/dashboard');
  }
};
