const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const companySchema = new Schema({
    companyName: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    typeOfCompany: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true,
    },
    proof: {
        type: String,
    },
    companyLogo: {
        type: String,
    },
    officialWebsite: {
        type: String,
        validate: {
            validator: (v) =>
                /^https?:\/\/(www\.)?[a-zA-Z0-9-]+\.[a-zA-Z]{2,}.*$/.test(v),
            message: "Invalid URL format",
        },
    },
    companyContact: {
        type: String,
        required: true,
    },
    companyFoundedYear: {
        type: String,
    },
    recruiterName: {
        type: String,
        required: true,
    },
    jobTitle: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        enum: ["Male", "Female", "Other"],
        required: true,
    },
    age: {
        type: Number,
        required: true,
        min: 18,
    },
    recruiterEmail: {
        type: String,
        required: true,
        validate: {
            validator: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
            message: "Invalid email format",
        },
    },
    workingYears: {
        type: Number,
        required: true,
    },
    linkedinProfile: {
        type: String,
        validate: {
            validator: (v) => /^https?:\/\/(www\.)?linkedin\.com\/.*$/.test(v),
            message: "Invalid LinkedIn URL",
        },
    },
    personalContact: {
        type: String,
    },
    profilePhoto: {
        type: String,
    },
    certificates: {
        type: String,
    },
    companyAddress: {
        type: String,
        required: true,
    },
    companySize: {
        type: Number,
    },
    companyEmail: {
        type: String,
        required: true,
    },
    companyRegistrationNumber: {
        type: Number,
    },
    companyTaxIdentificationNumber: {
        type: Number,
    },
    companyMedia: {
        type: String,
    },
}, {timestamps: true})

const Company = model('Company', companySchema);

module.exports = Company;
