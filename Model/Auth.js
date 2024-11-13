const mongoose = require('mongoose')
const passport = require('passport')
const passportLocalMongoose = require('passport-local-mongoose')
const { Schema, model} = mongoose;



const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    userType: {
        type: String,
        enum: ['recruiter', 'candidate', 'admin' ],
        required: true
    },
    city:{
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    resetToken: String,
    resetTokenExpiration: Date,
    isVerified: {
        type: Boolean,
        default: false
    },
    verificationToken: String
},
    {timestamps:true}
);


userSchema.plugin(passportLocalMongoose)
const userModel = model("user", userSchema)
passport.use(userModel.createStrategy())
passport.serializeUser(userModel.serializeUser())
passport.deserializeUser(userModel.deserializeUser())


module.exports = userModel
