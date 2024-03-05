require('dotenv').config()
const express = require('express')
const connectDB = require('./connectDb/connect')
const mongoose = require('mongoose')
const router = require('./Route/handler')
const session = require('express-session')
const passport = require('passport')


port = process.env.port || 9000

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended:true}));



app.use(session({
    secret:'colab',
    resave: false,
    saveUninitialized: true,
    cookie: {maxAge: 24 * 64000}
}))

app.use(passport.initialize())
app.use(passport.session())

app.use("/", router)






app.listen(port, ()=>{
    connectDB();
    console.log(`server started on  ${port}`)
})