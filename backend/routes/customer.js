const express = require('express')
const { CreateAccount, Login, renderProfile, editAddress } = require('../controllers/customer')
const router = express.Router({mergeParams: true})
const { authorization } = require('../middleware')

router.get('/', authorization, renderProfile)

router.route('/editAddress')
.put(authorization, editAddress)

router.route('/register')
.post(CreateAccount)

router.route('/login')
.post(Login)

module.exports = router