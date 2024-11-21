const mongoose = require('mongoose');
const { Schema, model } = mongoose;


const candidateProfileSchema = new mongoose.Schema(
    {
        candidateName: {
            type: String,
            required: true,
        },
        candidateEmail: {
            type: String,
            required: true,
            unique: true,
        },
        candidateAge: {
            type: Number,
            required: true,
        },
        candidateGender: {
            type: String,
            required: true,
        },
        candidatePassport: {
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
        governmentId: {
            type: String,
            required: true,
        },
        collegeIdProof: {
            type: String,
        },
        marksheets: {
            type: String,
        },
        certifications: {
            type: String,
        },
        video: {
            type: String,
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
        createdAt: {
            type: Date,
            default: Date.now,
        },
    },
    { timestamps: true }
)

const CandidateProfile = model('CandidateProfile', candidateProfileSchema);

module.exports = CandidateProfile;