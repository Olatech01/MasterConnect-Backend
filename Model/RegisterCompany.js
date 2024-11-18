const mongoose = require('mongoose')
const { Schema, model } = mongoose;


const companySchema = new mongoose.Schema({
    companyName: String,
    typeOfCompany: String,
    city: String,
    state: String,
    logo: String, 
    officialWebsite: String,
    companyContact: String,
    companyFoundedYear: String,
    recruiterName: String,
    jobTitle: String,
    gender: String,
    age: Number,
    email: String,
    workingYears: Number,
    linkedinProfile: String,
    personalContact: String,
    verificationDetails: {
        documentType: String,
        documentFile: String,
    },
    additionalDetails: {
        notes: String,
        attachments: [String],
    },
}, {timestamps: true})

const companyModel = model('company', companySchema)

module.exports = companyModel