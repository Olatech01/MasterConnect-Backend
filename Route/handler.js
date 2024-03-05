const express = require('express')
const { createBlog, updateBlog, deleteBlog, findAllBlogs, findSingleBlog } = require('../controller/blog')
const { isAdmin, isLoggedin } = require('../MiddeleWare/auth')
const { register } = require('../controller/user')
const { login } = require('../controller/user')


const router = express.Router()


router.route('/register').post(register)
router.route('/login').post(login)
router.route('/createBlog').post([isAdmin, isLoggedin], createBlog)
router.route('/updateBlog').patch([isAdmin, isLoggedin], updateBlog)
router.route('/deleteBlog').delete([isAdmin, isLoggedin], deleteBlog)
router.route("/findAllBlog").get([isLoggedin], findAllBlogs)
router.route("/singleBlog/:blogId").get(findSingleBlog)



module.exports = router