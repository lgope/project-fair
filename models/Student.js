const mongoose = require('mongoose');
const validator = require('validator');

const studentSchema = new mongoose.Schema({
    studentName: {
        type: String,
        required: [true, 'Please provide your name']
    },
    studentId: {
        type: String,
        required: [true, 'Please provide your Student Id']
    },
    email: {
        type: String,
        required: [true, 'Please provide your email'],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, 'Please provied a valid email']
    },
    semester: {
        type: String,
        required: [true, 'Please provide your semester']
    },
    course: {
        type: String,
        required: [true, 'Please provide your course']
    },
});

module.exports = mongoose.model('Student', studentSchema);
