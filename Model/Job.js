const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const SALARY_DURATION = ['Hourly', 'Daily', 'Weekly', 'Monthly', 'Annually'];
const STIPEND = ['Fixed', 'Negotiable', 'Performance Based', 'Unpaid']

const jobSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    postion: {
        type: String,
        required: true
    },
    workType: {
        type: String,
        required: true
    },
    skills: {
        type: [String],
        required: true
    },
    experience: {
        type: Number,
        required: true
    },
    salary: {
        type: Number,
        required: true
    },
    salaryDuration: {
        type: String,
        required: true,
        enum: SALARY_DURATION
    },
    stipend: {
        type: String,
        required: true,
        enum: STIPEND
    },
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'recruiter',
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
}, {timestamps})

module.exports = model('job', jobSchema);