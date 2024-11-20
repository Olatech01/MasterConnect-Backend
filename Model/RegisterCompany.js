const mongoose = require('mongoose')
const { Schema, model } = mongoose;


const companySchema = new mongoose.Schema({
    companyName: String,
    typeOfCompany: String,
    city: String,
    state: String,
    // proof: String,
    // companyLogo: String,
    officialWebsite: String,
    companyContact: String,
    companyFoundedYear: String,
    recruiterName: String,
    jobTitle: String,
    gender: String,
    age: Number,
    recruiterEmail: String,
    workingYears: Number,
    linkedinProfile: String,
    personalContact: String,
    // profilePhoto: String,
    // certificates: String,
    companyAddress: String,
    companySize: Number,
    companyEmail: String,
    companyRegistrationNumber: Number,
    companyTaxIdentidicationNumber: Number,
    companyMedia: String

}, { timestamps: true })

const companyModel = model('company', companySchema)

module.exports = companyModel