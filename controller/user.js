const userModel = require("../Model/Auth")
const bcryt = require('bcrypt')
const passport = require('passport')


const register = async(req, res)=>{
    const{username, email, password} = req.body
    if(!username){
        return res.json({error: "Username is required"})
    }
    if(!email){
        return res.json({error: "Email is required"})
    }
    if(!password){
        return res.json({error: "Password is required"})
    }
    if(!username || !email || !password){
        return res.status(400).json({error: "All fields are required "})
    }
    const existingUser = await userModel.findOne({email})
    if(existingUser){
        return res.json({error: "User already exist"})
    }
    const salt = await bcryt.genSalt(10)
    const hashpassword = await bcryt.hash(req.body.password, salt);
    const newUser = new userModel({
        username:username,
        email:email,
        password:hashpassword
    })
    await userModel.register(newUser, password, function(err){
        if(err){
            console.log(err);
        }
        passport.authenticate("local")(req,res, function(err){
        res.json({message: "You have successfully signed up"})
    })

})
}


const login = async(req, res)=>{
    const{username, password} = req.body;
    if(!username){
        res.json({error: "Username is required"})
    }
    if(!password){
        res.json({error: "Password is required"})
    }
    const existingUser = await userModel.findOne({username})
    if(!existingUser){
        return res.json({error: "User not found! Kindly sign up to continue"})
    }
    const passwordMatch = await bcryt.compare(password, existingUser.password)
    if(!passwordMatch){
        return res.json({error: "Incorrect password"})
    }

    const user = new userModel({
        username,
        password
    })
    req.login(user, function(err){
        if(err){
            return res.json(err)
        }
        passport.authenticate("local")(req, res, function(){
            res.json({message: "You have succssfully logged in"})
        })
    })
}


module.exports = {
    register,
    login
}