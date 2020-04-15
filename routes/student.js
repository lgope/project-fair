const express = require('express');
const Proposal = require('../models/Proposal');
const Student = require('../models/Student');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated, ensureUserIsStudent } = require('../config/auth');

// Welcome Page
router.get('/:studentName', ensureAuthenticated, ensureUserIsStudent, async (req, res) => {

    const student = await Student.findOne({ email: req.user.email });
    const proposal = await Proposal.findOne({ studentId: student.studentId });

    res.render('student/studentHomePage.ejs', { pageTitle: `Project Fair | ${student.studentName}`, student, proposal })
});

router.get('/new-proposal/:studentId', ensureAuthenticated, ensureUserIsStudent, (req, res) => {
    res.render('student/newProposal.ejs', { pageTitle: `Project Fair | New Proposal 👍`, studentId: req.params.studentId, studentName: req.user.userName });

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

        res.redirect(`/student/${req.user.userName}`);
    } catch (error) {
        console.log(error);
    }

});


// TODO:

// ensureUserIsAuthenticatedAndStudent

// router.get('/new-proposal', ensureAuthenticated, ensureUserIsStudent, (req, res) => res.render('student/studentHomePage.ejs', {user: req.user}));

module.exports = router;