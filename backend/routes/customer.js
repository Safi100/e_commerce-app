const express = require('express')
const { CreateAccount, Login, renderProfile, editAddress, send_reset_mail, reset_password } = require('../controllers/customer')
const router = express.Router({mergeParams: true})
const { authorization } = require('../middleware')

router.get('/', authorization, renderProfile)

router.route('/editAddress')
.put(authorization, editAddress)

router.route('/register')
.post(CreateAccount)

router.route('/login')
.post(Login)

router.route('/send-reset-mail')
.post(send_reset_mail)

router.route('/reset-password/:id/:token')
.post(reset_password)

module.exports = router