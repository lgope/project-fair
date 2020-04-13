const express = require('express');
const Proposal = require('../models/Proposal');
const Student = require('../models/Student');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated, ensureUserIsStudent } = require('../config/auth');

// Welcome Page
router.get('/', ensureAuthenticated, ensureUserIsStudent, async (req, res) => {

    const student = await Student.findOne({ email: req.user.email });
    const proposal = await Proposal.findOne({ studentId: student.studentId });

    res.render('student/studentHomePage.ejs', { student, proposal })
});

router.get('/new-proposal/:studentId', ensureAuthenticated, ensureUserIsStudent, (req, res) => {
    res.render('student/newProposal.ejs', { studentId: req.params.studentId });

});

router.post('/new-proposal', ensureAuthenticated, ensureUserIsStudent, async (req, res) => {

    try {
        const { student_id, project_title, project_des, project_lang } = req.body;   

        await Proposal.create({
            studentId: student_id,
            projectTitle: project_title,
            projectDes: project_des,
            projectLang: project_lang
        })

        res.redirect('/student');
    } catch (error) {
        console.log(error);
    }

});


// TODO:

// ensureUserIsAuthenticatedAndStudent

// router.get('/new-proposal', ensureAuthenticated, ensureUserIsStudent, (req, res) => res.render('student/studentHomePage.ejs', {user: req.user}));

module.exports = router;