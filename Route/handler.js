const express = require('express')
const { isAdmin, isLoggedin } = require('../MiddeleWare/auth')
const { register, emailVerification, login, changePassword } = require('../controller/user')


const router = express.Router()


router.route('/register').post(register)
router.route('/emailVerification').post(emailVerification)
router.route('/login').post(login)
router.route('/changePassword').post(changePassword)



module.exports = router