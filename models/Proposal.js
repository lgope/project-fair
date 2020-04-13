const mongoose = require('mongoose');
const slugify = require('slugify');

const proposalSchema = new mongoose.Schema({
    studentId: {
        type: String,
        required: [true, 'Please provide Student Id']
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    projectTitle: {
        type: String,
        required: [true, 'Please provide your Project title']
    },
    projectDes: {
        type: String,
        required: [true, 'Please provide your Project Des.']
    },
    projectLang: {
        type: String,
        required: [true, 'Please provide your Project language.']
    },
    isApproved: {
        type: String,
        default: 'Pending'
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
});

proposalSchema.pre('validate', function (next) {
    if (this.projectTitle) {
        this.slug = slugify(this.projectTitle, { lower: true, strict: true });
    }
    next();
});

module.exports = mongoose.model('Proposal', proposalSchema);
