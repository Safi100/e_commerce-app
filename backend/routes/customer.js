const express = require('express')
const { CreateAccount, Login } = require('../controllers/customer')
const router = express.Router({mergeParams: true})

router.route('/register')
.post(CreateAccount)

router.route('/login')
.post(Login)

module.exports = router