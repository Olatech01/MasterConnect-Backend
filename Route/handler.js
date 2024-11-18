const express = require('express')
const { isAdmin, isLoggedin } = require('../MiddeleWare/auth')
const { register, emailVerification, login, changePassword } = require('../controller/user')
const { basicDetails, recruiterDetails } = require('../controller/companyRegistration')


const router = express.Router()


router.route('/register').post(register)
router.route('/emailVerification').post(emailVerification)
router.route('/login').post(login)
router.route('/changePassword').post(changePassword)



// company //

router.route('/basicDetails').post(basicDetails)
router.route('/recruiterDetails').post(recruiterDetails)



module.exports = router