const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const SALARY_DURATION = ['Hourly', 'Daily', 'Weekly', 'Monthly', 'Annually'];

const jobSchema = new Schema({
    title: { type: String, required: true },
    company: { type: String, required: true },
    location: { type: String, required: true },
    salary: { type: String, required: false },
    jobType: { type: String, required: true },
    description: { type: String, required: true },
    postedDate: { type: Date, default: Date.now },
    salaryDuration: { type: String, enum: SALARY_DURATION },
    skills: { type: [String], required: true },
    experience: { type: String, required: true },
    deadline: { type: Date, required: false },
})

const jobModel = model('job', jobSchema)

module.exports = jobModel;