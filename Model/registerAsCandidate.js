const mongoose = require('mongoose')
const { Schema, model } = mongoose;


const candidateSchema = new Schema({
    candidateName: {
        type: String,
        required: true,
    },
    candidateEmail: {
        type: String,
        required: true,
    },
    candidateAge: {
        type: Number,
        required: true,
    },
    candidateGender: {
        type: String,
        required: true,
    },
    candidatePosition: {
        type: String,
        required: true,
    },
    candidateLinkedin: {
        type: String,
        required: true,
    },
    internShipCompleted: {
        type: String,
        required: true,
    },
    hobbies: {
        type: String,
    },
    rank: {
        type: String,
    },
    institution: {
        type: String,
        required: true,
    },
    degreeType: {
        type: String,
        required: true,
    },
    institutionStartDate: {
        type: Date,
        required: true,
    },
    institutionEndDate: {
        type: Date,
        required: true,
    },
    departmentType: {
        type: String,
        required: true,
    },
    passport: {
        type: String,
        required: true,
    },
    governmentID: {
        type: String,
        required: true,
    },
    collegeID: {
        type: String,
        required: true,
    },
    certificates: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
}, { timestamps: true })

const CandidateProfile = model('Candidate', candidateSchema);

module.exports = CandidateProfile;