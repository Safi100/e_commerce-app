const express = require('express')
const { CreateAccount, Login, renderProfile, editAddress, send_reset_mail,
    reset_password, editCustomerData, Logout, fetchCurrentUser } = require('../controllers/customer')
const router = express.Router({mergeParams: true})
const { authorization } = require('../middleware')

router.get('/renderProfile', authorization, renderProfile)

router.get('/currentUser', authorization, fetchCurrentUser)

router.route('/editAddress')
.put(authorization, editAddress)

router.route('/editCustomerData')
.put(authorization, editCustomerData)

router.route('/register')
.post(CreateAccount)

router.route('/login')
.post(Login)

router.route('/send-reset-mail')
.post(send_reset_mail)

router.route('/reset-password/:id/:token')
.post(reset_password)

router.post('/logout', authorization, Logout)

module.exports = router