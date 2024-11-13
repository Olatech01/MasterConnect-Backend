const express = require('express')
const { isAdmin, isLoggedin } = require('../MiddeleWare/auth')
const { register, emailVerification } = require('../controller/user')


const router = express.Router()


router.route('/register').post(register)
router.route('/emailVerification').post(emailVerification)



module.exports = router