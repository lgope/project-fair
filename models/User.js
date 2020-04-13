const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: [true, 'Please provide your name']
  },
  email: {
    type: String,
    required: [true, 'Please provide your email'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provied a valid email']
  },
  password: {
    type: String,
    required: [true, 'Need a password!'],
    minlength: 5
  },
  role: {
    type: String,
    default: 'student'
  },
});

module.exports = mongoose.model('User', userSchema);
