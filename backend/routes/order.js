const express = require('express')
const { create_payment_intent } = require('../controllers/order')
const router = express.Router({mergeParams: true})
const { authorization } = require('../middleware')

router.route('/create-payment-intent/')
.post(authorization, create_payment_intent)

module.exports = router