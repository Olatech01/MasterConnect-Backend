const express = require('express')
const { isAdmin, isLoggedin } = require('../MiddeleWare/auth')
const { register, emailVerification, login } = require('../controller/user')


const router = express.Router()


router.route('/register').post(register)
router.route('/emailVerification').post(emailVerification)
router.route('/login').post(login)



module.exports = router